import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { EnergyPeriod, Energy, Resolvers } from "./generated/graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
import {
  EnergyType,
  assertUnitsOneOf,
  getConsumptionData,
  pointIsUnit,
} from "./data/consumptionData";
import { generateAllThirtyMinutePeriodsBetween } from "./generatePeriods";
import { getGridData } from "./data/gridData";
import { formatISO } from "date-fns/formatISO";
import { gasPoint, gasPointForPeriod, gasPointFromData } from "./gas";
import { electricityPoint, electricityPointFromData } from "./electricity";
import {
  LITRES,
  WATT_HOURS,
  WattHourConsumption,
  litresToWattHours,
  withUnit,
} from "./units";

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  scalar DateTime

  extend type Query {
    energy(startDate: DateTime!, endDate: DateTime!): Energy!
  }

  type Energy {
    startDate: DateTime!
    endDate: DateTime!
    gas: EnergyPoint!
    electricity: EnergyPoint!
    periods: [EnergyPeriod!]!
  }

  type EnergyPeriod {
    startDate: DateTime!
    endDate: DateTime!
    electricity: EnergyPoint!
    gas: EnergyPoint!
  }

  type EnergyPoint {
    usage: Float!
    emissions: Float!
    missingData: Boolean!
    mix: [FuelMix!]!
  }

  type FuelMix {
    fuel: String!
    percentage: Float!
  }
`;

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    energy: async (_: {}, { startDate, endDate }) => {
      const [electricityData, gasData, gridData] = await Promise.all([
        getConsumptionData(EnergyType.ELECTRICITY, startDate, endDate),
        getConsumptionData(EnergyType.GAS, startDate, endDate),
        getGridData(startDate, endDate),
      ]);
      const electricityLookup = new Map(
        electricityData.map((data) => [formatISO(data.startDate), data]),
      );
      const gasLookup = new Map(
        gasData.map((data) => [formatISO(data.startDate), data]),
      );
      const gridLookup = new Map(
        gridData.map((data) => [formatISO(data.startDate), data]),
      );
      const periods: Array<EnergyPeriod> =
        generateAllThirtyMinutePeriodsBetween({ startDate, endDate }).map(
          ({ startDate, endDate }) => {
            const electricity = electricityLookup.get(formatISO(startDate));
            const gas = gasLookup.get(formatISO(startDate));
            const grid = gridLookup.get(formatISO(startDate));
            return {
              startDate,
              endDate,
              electricity: electricityPointFromData(electricity, grid),
              gas: gasPointFromData(gas),
            };
          },
        );

      const electricityTotals = periods.reduce(
        (acc, period) => {
          acc.usage = withUnit(
            WATT_HOURS,
            acc.usage + period.electricity.usage * 1_000,
          );
          acc.emissions += period.electricity.emissions;
          acc.missingData = acc.missingData || period.electricity.missingData;
          period.electricity.mix.forEach(({ fuel, percentage }) => {
            acc.fuelUsage[fuel] =
              (acc.fuelUsage[fuel] ?? 0) +
              period.electricity.usage * 1_000 * (percentage / 100);
          });
          return acc;
        },
        {
          usage: 0 as WattHourConsumption,
          emissions: 0,
          missingData: false,
          fuelUsage: {} as { [fuel: string]: number },
        },
      );
      return {
        startDate,
        endDate,
        electricity: electricityPoint({
          usage: electricityTotals.usage,
          missingData: electricityTotals.missingData,
          emissions: electricityTotals.emissions,
          mix: Object.entries(electricityTotals.fuelUsage).map(
            ([fuel, usage]) => ({
              fuel,
              percentage: (usage / electricityTotals.usage) * 100,
            }),
          ),
        }),
        gas: gasPointForPeriod({ startDate, endDate }, gasData),
        periods,
      } satisfies Energy;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
