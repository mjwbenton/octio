import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { Resolvers } from "./generated/graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
import { getConsumptionData } from "./consumptionData";
import { EnergyType } from "./energyType";
import { addMinutes } from "date-fns/addMinutes";
import { generateAllThirtyMinutePeriodsBetween } from "./generatePeriods";

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  scalar DateTime

  extend type Query {
    energy(startDate: DateTime!, endDate: DateTime!): [EnergyPeriod!]!
  }

  type EnergyPeriod {
    startTime: DateTime!
    endTime: DateTime!
    gas: GasPoint!
    electricity: ElectricityPoint!
  }

  type GasPoint {
    usage: Float!
    missingData: Boolean!
  }

  type ElectricityPoint {
    usage: Float!
    missingData: Boolean!
  }
`;

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    energy: async (_: {}, { startDate, endDate }) => {
      const [electricityData, gasData] = await Promise.all([
        getConsumptionData(EnergyType.ELECTRICITY, startDate, endDate),
        getConsumptionData(EnergyType.GAS, startDate, endDate),
      ]);
      const electricityLookup = new Map(
        electricityData.map((data) => [data.startDate, data]),
      );
      const gasLookup = new Map(gasData.map((data) => [data.startDate, data]));
      return generateAllThirtyMinutePeriodsBetween(startDate, endDate).map(
        (startTime) => {
          const electricity = electricityLookup.get(startTime);
          const gas = gasLookup.get(startTime);
          return {
            startTime,
            endTime: addMinutes(startTime, 30),
            electricity: {
              usage: electricity?.consumption ?? 0,
              missingData: electricity === undefined,
            },
            gas: {
              usage: gas?.consumption ?? 0,
              missingData: gas === undefined,
            },
          };
        },
      );
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
