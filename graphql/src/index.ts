import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { EnergyPeriod, EnergyResult, Resolvers } from "./generated/graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
import { getConsumptionData } from "./consumptionData";
import { EnergyType } from "./energyType";
import { addMinutes } from "date-fns/addMinutes";
import { generateAllThirtyMinutePeriodsBetween } from "./generatePeriods";
import { getGridData } from "./gridData";
import { formatISO } from "date-fns/formatISO";

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  scalar DateTime

  extend type Query {
    energy(startDate: DateTime!, endDate: DateTime!): EnergyResult!
  }

  type EnergyResult {
    startDate: DateTime!
    endDate: DateTime!
    gas: GasPoint!
    electricity: ElectricityPoint!
    periods: [EnergyPeriod!]!
  }

  type EnergyPeriod {
    startDate: DateTime!
    endDate: DateTime!
    gas: GasPoint!
    electricity: ElectricityPoint!
  }

  type GasPoint {
    usage: Float!
    missingData: Boolean!
  }

  type ElectricityPoint {
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
        generateAllThirtyMinutePeriodsBetween(startDate, endDate).map(
          (startDate) => {
            const electricity = electricityLookup.get(formatISO(startDate));
            const gas = gasLookup.get(formatISO(startDate));
            const grid = gridLookup.get(formatISO(startDate));
            return {
              startDate,
              endDate: addMinutes(startDate, 30),
              electricity: {
                usage: electricity?.consumption ?? 0,
                emissions:
                  Math.round(
                    (grid?.intensity ?? 0) * (electricity?.consumption ?? 0),
                  ) / 1000, // kgCo2e
                missingData: electricity === undefined || grid === undefined,
                mix: grid?.mix ?? [],
              },
              gas: {
                usage: gas?.consumption ?? 0,
                missingData: gas === undefined,
              },
            };
          },
        );
      const totals = periods.reduce(
        (acc, period) => {
          acc.electricity.usage += period.electricity.usage;
          acc.electricity.emissions += period.electricity.emissions;
          acc.electricity.missingData =
            acc.electricity.missingData || period.electricity.missingData;
          acc.gas.usage += period.gas.usage;
          acc.gas.missingData = acc.gas.missingData || period.gas.missingData;
          return acc;
        },
        {
          gas: { usage: 0, missingData: false },
          electricity: { usage: 0, emissions: 0, missingData: false },
        },
      );
      return {
        startDate,
        endDate,
        electricity: {
          emissions: Math.round(totals.electricity.emissions * 1000) / 1000,
          missingData: totals.electricity.missingData,
          usage: Math.round(totals.electricity.usage * 1000) / 1000,
          mix: [],
        },
        gas: {
          usage: Math.round(totals.gas.usage * 1000) / 1000,
          missingData: totals.gas.missingData,
        },
        periods,
      } satisfies EnergyResult;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  csrfPrevention: false,
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
