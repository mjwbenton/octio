import { DynamoDBClient, paginateQuery } from "@aws-sdk/client-dynamodb";
import env from "../env";
import { parseISO } from "date-fns/parseISO";

const DYNAMO_CLIENT = new DynamoDBClient({});

export interface ConsumptionDataPoint {
  energyType: EnergyType;
  startDate: Date;
  endDate: Date;
  consumption: number;
}

export enum EnergyType {
  ELECTRICITY = "ELECTRICITY",
  GAS = "GAS",
}

export async function getConsumptionData(
  energyType: EnergyType,
  startDate: Date,
  endDate: Date,
): Promise<Array<ConsumptionDataPoint>> {
  const command = {
    TableName: env.CONSUMPTION_TABLE,
    KeyConditionExpression:
      "energyType = :energyType and startDate between :start and :end",
    ExpressionAttributeValues: {
      ":energyType": { S: energyType },
      ":start": { S: startDate.toISOString() },
      ":end": { S: endDate.toISOString() },
    },
  };

  const paginator = paginateQuery(
    { client: DYNAMO_CLIENT, pageSize: 1000 },
    command,
  );

  const results: Array<ConsumptionDataPoint> = [];
  for await (const page of paginator) {
    console.log("Consumption Data Page", JSON.stringify(page, null, 2));
    page.Items?.forEach((val) => {
      results.push({
        energyType: val.energyType.S! as EnergyType,
        startDate: parseISO(val.startDate.S!),
        endDate: parseISO(val.endDate.S!),
        consumption: parseFloat(val.consumption.N!),
      });
    });
  }
  return results;
}
