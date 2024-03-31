import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { EnergyPeriod, Energy, Resolvers } from "./generated/graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
import { EnergyType, getConsumptionData } from "./data/consumptionData";
import { generateAllThirtyMinutePeriodsBetween } from "./generatePeriods";
import { getGridData } from "./data/gridData";
import { formatISO } from "date-fns/formatISO";
import { gasPoint, gasPointFromData } from "./gas";
import { electricityPoint, electricityPointFromData } from "./electricity";

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
      const totals = periods.reduce(
        (acc, period) => {
          acc.electricity.usage += period.electricity.usage;
          acc.electricity.emissions += period.electricity.emissions;
          acc.electricity.missingData =
            acc.electricity.missingData || period.electricity.missingData;
          period.electricity.mix.forEach(({ fuel, percentage }) => {
            acc.electricity.fuelUsage[fuel] =
              (acc.electricity.fuelUsage[fuel] ?? 0) +
              period.electricity.usage * (percentage / 100);
          });
          acc.gas.usage += period.gas.usage;
          acc.gas.missingData = acc.gas.missingData || period.gas.missingData;
          return acc;
        },
        {
          gas: {
            usage: 0,
            missingData: false,
          },
          electricity: {
            usage: 0,
            emissions: 0,
            missingData: false,
            fuelUsage: {} as { [fuel: string]: number },
          },
        },
      );
      return {
        startDate,
        endDate,
        electricity: electricityPoint({
          usage: totals.electricity.usage,
          missingData: totals.electricity.missingData,
          emissions: totals.electricity.emissions,
          mix: Object.entries(totals.electricity.fuelUsage).map(
            ([fuel, usage]) => ({
              fuel,
              percentage: (usage / totals.electricity.usage) * 100,
            }),
          ),
        }),
        gas: gasPoint({
          usage: totals.gas.usage,
          missingData: totals.gas.missingData,
        }),
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
