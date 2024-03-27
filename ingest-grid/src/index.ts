import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import chunk from "lodash.chunk";
import { formatISO } from "date-fns/formatISO";
import { subDays } from "date-fns/subDays";
import { APIGatewayEvent, EventBridgeEvent } from "aws-lambda";

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
  const response = await fetch(
    `https://api.carbonintensity.org.uk/regional/intensity/${from}/${to}/postcode/${POSTCODE}`,
    {
      headers: HEADERS,
    },
  );
  const result = (await response.json()) as {
    data: { data: Array<InputDataType> };
  };
  await writeData(result.data.data);
}

function datesFromEvent(event: Event) {
  const defaultFrom = formatISO(subDays(new Date(), 1));
  const defaultTo = formatISO(new Date());
  if (eventIsApiEvent(event)) {
    return {
      from: event.queryStringParameters?.from ?? defaultFrom,
      to: event.queryStringParameters?.to ?? defaultTo,
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
