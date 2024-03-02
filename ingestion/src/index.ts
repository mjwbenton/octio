import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import { cleanEnv, str } from "envalid";
import chunk from "lodash.chunk";

const { DATA_TABLE } = cleanEnv(process.env, {
  DATA_TABLE: str(),
});

const DYNAMO_CLIENT = new DynamoDBClient({});
const CHUNK_SIZE = 25;

enum EnergyType {
  ELECTRICITY = "ELECTRICITY",
  GAS = "GAS",
}

type EnergyTypeKey = keyof typeof EnergyType;

const ENERGY_TYPE_CONFIG = {
  [EnergyType.ELECTRICITY]: {
    endpoint: `https://api.octopus.energy/v1/electricity-meter-points/${env.OCTOPUS_ELECTRICITY_MPAN}/meters/${env.OCTOPUS_ELECTRICITY_SERIAL}/consumption/`,
  },
  [EnergyType.GAS]: {
    endpoint: `https://api.octopus.energy/v1/gas-meter-points/${env.OCTOPUS_GAS_MPRN}/meters/${env.OCTOPUS_GAS_SERIAL}/consumption/`,
  },
} as const;

type InputDataType = {
  interval_start: string;
  interval_end: string;
  consumption: number;
};

const HEADERS = {
  Authorization: `Basic ${Buffer.from(env.OCTOPUS_API_KEY + ":").toString("base64")}`,
};

export async function handler() {
  await Promise.all([
    importType(EnergyType.ELECTRICITY),
    importType(EnergyType.GAS),
  ]);
}

async function importType(type: EnergyTypeKey) {
  const response = await fetch(ENERGY_TYPE_CONFIG[type].endpoint, {
    headers: HEADERS,
  });
  const result = (await response.json()) as { results: Array<InputDataType> };
  await writeData(type, result.results);
}

async function writeData(
  energyType: EnergyTypeKey,
  data: Array<InputDataType>
) {
  return Promise.all(
    chunk(data, CHUNK_SIZE).map(async (batch) => {
      try {
        return await DYNAMO_CLIENT.send(
          new BatchWriteItemCommand({
            RequestItems: {
              [DATA_TABLE]: batch.map((item) => ({
                PutRequest: {
                  Item: {
                    energyType: { S: energyType },
                    startDate: { S: item.interval_start },
                    endDate: { S: item.interval_end },
                    consumption: { N: item.consumption.toString() },
                  },
                },
              })),
            },
          })
        );
      } catch (e) {
        throw new Error(
          `Failed on chunk containing ${energyType} data: ${JSON.stringify(
            batch,
            null,
            2
          )}`
        );
      }
    })
  );
}
