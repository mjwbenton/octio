import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import env from "../env";
import { formatISO } from "date-fns/formatISO";
import { parseISO } from "date-fns/parseISO";

const POSTCODE = "BS3";

const DYNAMO_CLIENT = new DynamoDBClient({});

export interface GridDataPoint {
  startDate: Date;
  endDate: Date;
  intensity: number;
  mix: Array<{ fuel: string; percentage: number }>;
}

export async function getGridData(
  startDate: Date,
  endDate: Date,
): Promise<Array<GridDataPoint>> {
  const command = new QueryCommand({
    TableName: env.GRID_TABLE,
    KeyConditionExpression:
      "postcode = :postcode and startDate between :start and :end",
    ExpressionAttributeValues: {
      ":postcode": { S: POSTCODE },
      ":start": { S: formatISO(startDate) },
      ":end": { S: formatISO(endDate) },
    },
  });

  const results = await DYNAMO_CLIENT.send(command);
  console.log("Grid Data", JSON.stringify(results, null, 2));
  return (
    results.Items?.map((val) => ({
      startDate: parseISO(val.startDate.S!),
      endDate: parseISO(val.endDate.S!),
      intensity: parseInt(val.intensity.N!),
      mix: val.mix.L!.map((mix) => ({
        fuel: mix.M!.fuel.S!,
        percentage: parseFloat(mix.M!.percentage.N!),
      })),
    })) ?? []
  );
}
