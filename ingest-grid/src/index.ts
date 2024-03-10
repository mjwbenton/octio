import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import chunk from "lodash.chunk";
import { formatISO } from "date-fns/formatISO";
import { subDays } from "date-fns/subDays";

const PARTITION = "x";
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

export async function handler() {
  const from = formatISO(subDays(new Date(), 1));
  const to = formatISO(new Date());
  const response = await fetch(
    `https://api.carbonintensity.org.uk/regional/intensity/${from}/${to}/postcode/BS3`,
    {
      headers: HEADERS,
    }
  );
  const result = (await response.json()) as {
    data: { data: Array<InputDataType> };
  };
  await writeData(result.data.data);
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
                    partitionKey: { S: PARTITION },
                    startDate: { S: item.from },
                    endDate: { S: item.to },
                    intensity: { N: item.intensity.forecast.toString() },
                    mix: {
                      L: item.generationmix.map((mix) => ({
                        M: {
                          fueld: { S: mix.fuel },
                          percentage: { N: mix.perc.toString() },
                        },
                      })),
                    },
                  },
                },
              })),
            },
          })
        );
      } catch (e) {
        throw new Error(`Failed on data: ${JSON.stringify(batch, null, 2)}`);
      }
    })
  );
}
