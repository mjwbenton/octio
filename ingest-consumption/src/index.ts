import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import chunk from "lodash.chunk";
import { APIGatewayEvent, EventBridgeEvent } from "aws-lambda";
import { formatISO } from "date-fns/formatISO";
import { subDays } from "date-fns/subDays";
import { parseISO } from "date-fns/parseISO";

const DYNAMO_CLIENT = new DynamoDBClient({});
const CHUNK_SIZE = 25;

const OCTOPUS_PAGE_SIZE = 25_000;

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

type Event = APIGatewayEvent | EventBridgeEvent<string, unknown>;

export async function handler(event: Event) {
  const { from, to } = datesFromEvent(event);
  await Promise.all([
    importType(EnergyType.ELECTRICITY, { from, to }),
    importType(EnergyType.GAS, { from, to }),
  ]);
}

function datesFromEvent(event: Event): { from: Date; to: Date } {
  const defaultFrom = subDays(new Date(), 1);
  const defaultTo = new Date();
  if (eventIsApiEvent(event)) {
    const query = event.queryStringParameters;
    return {
      from: query?.from ? parseISO(query?.from) : defaultFrom,
      to: query?.to ? parseISO(query?.to) : defaultTo,
    };
  } else {
    return {
      from: defaultFrom,
      to: defaultTo,
    };
  }
}

function eventIsApiEvent(event: Event): event is APIGatewayEvent {
  return "queryStringParameters" in event;
}

async function importType(
  type: EnergyTypeKey,
  { from, to }: { from: Date; to: Date },
) {
  const response = await fetch(
    `${ENERGY_TYPE_CONFIG[type].endpoint}?page_size=${OCTOPUS_PAGE_SIZE}&period_from=${formatISO(from)}&period_to=${formatISO(to)}`,
    {
      headers: HEADERS,
    },
  );
  const result = (await response.json()) as { results: Array<InputDataType> };
  await writeData(type, result.results);
}

async function writeData(
  energyType: EnergyTypeKey,
  data: Array<InputDataType>,
) {
  return Promise.all(
    chunk(data, CHUNK_SIZE).map(async (batch) => {
      try {
        return await DYNAMO_CLIENT.send(
          new BatchWriteItemCommand({
            RequestItems: {
              [env.DATA_TABLE]: batch.map((item) => ({
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
          }),
        );
      } catch (e) {
        throw new Error(
          `Failed on chunk containing ${energyType} data: ${JSON.stringify(
            batch,
            null,
            2,
          )}`,
        );
      }
    }),
  );
}
