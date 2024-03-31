import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import env from "../env";
import { formatISO } from "date-fns/formatISO";
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
  const command = new QueryCommand({
    TableName: env.CONSUMPTION_TABLE,
    KeyConditionExpression:
      "energyType = :energyType and startDate between :start and :end",
    ExpressionAttributeValues: {
      ":energyType": { S: energyType },
      ":start": { S: formatISO(startDate) },
      ":end": { S: formatISO(endDate) },
    },
  });

  const results = await DYNAMO_CLIENT.send(command);
  console.log("Consumption Data", JSON.stringify(results, null, 2));
  return (
    results.Items?.map((val) => ({
      energyType: val.energyType.S! as EnergyType,
      startDate: parseISO(val.startDate.S!),
      endDate: parseISO(val.endDate.S!),
      consumption: parseFloat(val.consumption.N!),
    })) ?? []
  );
}
