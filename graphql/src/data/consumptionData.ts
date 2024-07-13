import { DynamoDBClient, paginateQuery } from "@aws-sdk/client-dynamodb";
import env from "../env";
import { parseISO } from "date-fns/parseISO";
import { Consumption, ConsumptionUnit, LITRES, WATT_HOURS } from "../units";

const DYNAMO_CLIENT = new DynamoDBClient({});

export interface ConsumptionDataPoint<
  T extends ConsumptionUnit = ConsumptionUnit,
> {
  energyType: EnergyType;
  startDate: Date;
  endDate: Date;
  consumption: Consumption<T>;
  unit: T;
}

export function pointIsUnit<T extends ConsumptionUnit>(
  point: ConsumptionDataPoint,
  unit: T,
): point is ConsumptionDataPoint<T> {
  return point.unit === unit;
}

export function assertUnitsOneOf<T extends ConsumptionUnit[]>(
  point: ConsumptionDataPoint,
  ...units: [...T]
): asserts point is ConsumptionDataPoint<T[number]> {
  if (!units.includes(point.unit)) {
    throw new Error(
      `Expected point to have one of the following units: ${units.join(", ")}`,
    );
  }
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
      const unit =
        val.energyType.S! === "GAS" && val.source.S! === "DIRECT"
          ? LITRES
          : WATT_HOURS;
      results.push({
        energyType: val.energyType.S! as EnergyType,
        startDate: parseISO(val.startDate.S!),
        endDate: parseISO(val.endDate.S!),
        unit,
        consumption: parseFloat(val.consumption.N!) as Consumption<typeof unit>,
      });
    });
  }
  return results;
}
