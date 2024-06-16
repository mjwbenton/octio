import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import chunk from "lodash.chunk";
import { Event, datesFromEvent } from "./event";
import { ConsumptionPoint } from "./consumptionPoint";
import { fetchMeterMini } from "./meterMini";
import { fetchMeterDirect } from "./meterDirect";

const DYNAMO_CLIENT = new DynamoDBClient({});
const CHUNK_SIZE = 25;

export async function handler(event: Event) {
  const { from, to } = datesFromEvent(event);
  console.log("Fetching consumption data", { from, to });
  const [mini, direct] = await Promise.all([
    fetchMeterMini({ from, to }),
    fetchMeterDirect({ from, to }),
  ]);
  console.log("Fetched consumption data", {
    miniCount: mini.length,
    directCount: direct.length,
  });
  // Passing direct first means that direct data will be preferred to mini data
  const data = dedupe([...direct, ...mini]);
  console.log("Deduped consumption data", { count: data.length });
  await writeData(data);
  console.log("Importing consumption data", { from, to });
}

function dedupe(data: Array<ConsumptionPoint>) {
  const set = new Set<string>();
  return data.filter((item) => {
    const key = `${item.energyType}-${item.startDate}`;
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
}

async function writeData(data: Array<ConsumptionPoint>) {
  return Promise.all(
    chunk(data, CHUNK_SIZE).map(async (batch) => {
      try {
        return await DYNAMO_CLIENT.send(
          new BatchWriteItemCommand({
            RequestItems: {
              [env.CONSUMPTION_TABLE]: batch.map((item) => ({
                PutRequest: {
                  Item: {
                    energyType: { S: item.energyType },
                    startDate: { S: item.startDate },
                    endDate: { S: item.endDate },
                    consumption: { N: item.consumption.toString() },
                    source: { S: item.source },
                  },
                },
              })),
            },
          }),
        );
      } catch (e) {
        throw new Error(
          `Failed on chunk containing data: ${JSON.stringify(batch, null, 2)}`,
        );
      }
    }),
  );
}
