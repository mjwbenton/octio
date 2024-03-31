import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { EnergyPeriod, Energy, FuelMix, Resolvers } from "./generated/graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
import { getConsumptionData } from "./consumptionData";
import { EnergyType } from "./energyType";
import { addMinutes } from "date-fns/addMinutes";
import { generateAllThirtyMinutePeriodsBetween } from "./generatePeriods";
import { getGridData } from "./gridData";
import { formatISO } from "date-fns/formatISO";

// Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2023
const NATURAL_GAS_EMISSIONS_FACTOR = 203; // gCO2e/kWh

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
    emissions: Float!
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
                  ) / 1000, // kgCO2e
                missingData: electricity === undefined || grid === undefined,
                mix:
                  grid?.mix.map(({ fuel, percentage }) => ({
                    fuel,
                    emissions:
                      Math.round(
                        (grid?.intensity ?? 0) *
                          (electricity?.consumption ?? 0) *
                          (percentage / 100),
                      ) / 1000,
                  })) ?? [],
              },
              gas: {
                usage: gas?.consumption ?? 0,
                missingData: gas === undefined,
                emissions:
                  Math.round(
                    NATURAL_GAS_EMISSIONS_FACTOR * (gas?.consumption ?? 0),
                  ) / 1000,
                mix: [
                  {
                    fuel: "gas",
                    emissions:
                      Math.round(
                        NATURAL_GAS_EMISSIONS_FACTOR * (gas?.consumption ?? 0),
                      ) / 1000,
                  },
                ],
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
          period.electricity.mix.forEach(({ fuel, emissions }) => {
            const index = acc.electricity.mix.findIndex(
              (mix) => mix.fuel === fuel,
            );
            if (index != -1) {
              acc.electricity.mix[index].emissions += emissions;
            } else {
              acc.electricity.mix.push({ fuel, emissions });
            }
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
            mix: [] as FuelMix[],
          },
        },
      );
      return {
        startDate,
        endDate,
        electricity: {
          emissions: Math.round(totals.electricity.emissions * 1000) / 1000,
          missingData: totals.electricity.missingData,
          usage: Math.round(totals.electricity.usage * 1000) / 1000,
          mix: totals.electricity.mix.map(({ fuel, emissions }) => ({
            fuel,
            emissions: Math.round(emissions * 1000) / 1000,
          })),
        },
        gas: {
          usage: Math.round(totals.gas.usage * 1000) / 1000,
          missingData: totals.gas.missingData,
          emissions:
            Math.round(totals.gas.usage * NATURAL_GAS_EMISSIONS_FACTOR) / 1000,
          mix: [
            {
              fuel: "gas",
              emissions:
                Math.round(totals.gas.usage * NATURAL_GAS_EMISSIONS_FACTOR) /
                1000,
            },
          ],
        },
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
