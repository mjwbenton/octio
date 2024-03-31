import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import chunk from "lodash.chunk";
import { formatISO } from "date-fns/formatISO";
import { subDays } from "date-fns/subDays";
import { APIGatewayEvent, EventBridgeEvent } from "aws-lambda";
import { parseISO } from "date-fns/parseISO";

const POSTCODE = "BS3";
const DYNAMO_CLIENT = new DynamoDBClient({});
const CHUNK_SIZE = 25;

type InputDataType = {
  from: string;
  to: string;
  intensity: {
    forecast: number;
  };
  generationmix: Array<{
    fuel: string;
    perc: number;
  }>;
};

const HEADERS = {
  Accept: "application/json",
};

type Event = APIGatewayEvent | EventBridgeEvent<string, unknown>;

export async function handler(event: Event) {
  const { from, to } = datesFromEvent(event);
  console.log("Importing grid data", { from, to });
  const response = await fetch(
    `https://api.carbonintensity.org.uk/regional/intensity/${formatISO(from)}/${formatISO(to)}/postcode/${POSTCODE}`,
    {
      headers: HEADERS,
    },
  );
  const result = (await response.json()) as {
    data: { data: Array<InputDataType> };
  };
  console.log(`Fetched ${result.data.data.length} data points`);
  console.log(JSON.stringify(result.data.data, null, 2));
  await writeData(result.data.data);
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

async function writeData(data: Array<InputDataType>) {
  return Promise.all(
    chunk(data, CHUNK_SIZE).map(async (batch) => {
      try {
        return await DYNAMO_CLIENT.send(
          new BatchWriteItemCommand({
            RequestItems: {
              [env.GRID_TABLE]: batch.map((item) => ({
                PutRequest: {
                  Item: {
                    postcode: { S: POSTCODE },
                    startDate: { S: item.from },
                    endDate: { S: item.to },
                    intensity: { N: item.intensity.forecast.toString() },
                    mix: {
                      L: item.generationmix.map((mix) => ({
                        M: {
                          fuel: { S: mix.fuel },
                          percentage: { N: mix.perc.toString() },
                        },
                      })),
                    },
                  },
                },
              })),
            },
          }),
        );
      } catch (e) {
        console.error(e);
        throw new Error(`Failed on data: ${JSON.stringify(batch, null, 2)}`);
      }
    }),
  );
}
