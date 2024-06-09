import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import env from "./env";
import chunk from "lodash.chunk";
import { Event, datesFromEvent } from "./event";
import { EnergyType } from "./energyType";
import { ConsumptionPoint, fetchMeterDirect } from "./meter-direct";

const DYNAMO_CLIENT = new DynamoDBClient({});
const CHUNK_SIZE = 25;

export async function handler(event: Event) {
  const { from, to } = datesFromEvent(event);
  console.log("Importing consumption data", { from, to });
  await Promise.all([
    importType("ELECTRICITY", { from, to }),
    importType("GAS", { from, to }),
  ]);
}

async function importType(
  type: EnergyType,
  { from, to }: { from: Date; to: Date },
) {
  const results = await fetchMeterDirect(type, { from, to });
  console.log(`Fetched ${results.length} ${type} data points`);
  console.log(JSON.stringify(results, null, 2));
  await writeData(results);
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
