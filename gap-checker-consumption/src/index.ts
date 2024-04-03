import { DynamoDBClient, paginateQuery } from "@aws-sdk/client-dynamodb";
import env from "./env";
import { formatISO } from "date-fns/formatISO";
import { subDays } from "date-fns/subDays";
import { parseISO } from "date-fns/parseISO";
import { addMinutes } from "date-fns";

const DYNAMO_CLIENT = new DynamoDBClient({});

const CUSHION_DAYS = 3;

enum EnergyType {
  ELECTRICITY = "ELECTRICITY",
  GAS = "GAS",
}

const CONFIGURATION = {
  [EnergyType.ELECTRICITY]: {
    firstPeriod: parseISO("2024-02-14T23:30:00Z"),
    exceptions: [],
  },
  [EnergyType.GAS]: {
    firstPeriod: parseISO("2024-02-28T00:00:00Z"),
    exceptions: [
      ...generateDateList(
        parseISO("2024-03-11T22:30:00.000Z"),
        parseISO("2024-03-14T23:30:00.000Z"),
      ),
    ],
  },
} as const;

export async function handler() {
  const [missingElectricity, missingGas] = await Promise.all([
    checkType(EnergyType.ELECTRICITY),
    checkType(EnergyType.GAS),
  ]);
  if (missingElectricity > 0 || missingGas > 0) {
    throw new Error("Missing consumption data");
  }
}

function datesToCheck(type: EnergyType) {
  const startDate = CONFIGURATION[type].firstPeriod;
  const endDate = subDays(new Date(), CUSHION_DAYS);
  return { startDate, endDate };
}

function generateDateList(startDate: Date, endDate: Date): Array<Date> {
  const periods = [];
  let currentPeriod = startDate;
  while (currentPeriod < endDate) {
    periods.push(currentPeriod);
    currentPeriod = addMinutes(currentPeriod, 30);
  }
  return periods;
}

async function fetchConsumptionDates(
  energyType: EnergyType,
  startDate: Date,
  endDate: Date,
): Promise<Array<Date>> {
  const command = {
    TableName: env.CONSUMPTION_TABLE,
    KeyConditionExpression:
      "energyType = :energyType and startDate between :start and :end",
    ExpressionAttributeValues: {
      ":energyType": { S: energyType },
      ":start": { S: formatISO(startDate) },
      ":end": { S: formatISO(endDate) },
    },
  };

  const paginator = paginateQuery(
    { client: DYNAMO_CLIENT, pageSize: 1000 },
    command,
  );

  const dates: Array<Date> = [];
  for await (const page of paginator) {
    console.log(`Processing page with last item ${page.LastEvaluatedKey}`);
    page.Items?.forEach((val) => {
      dates.push(parseISO(val.startDate.S!));
    });
  }

  return dates;
}

async function checkType(type: EnergyType) {
  const { startDate, endDate } = datesToCheck(type);
  const generatedDates = generateDateList(startDate, endDate);
  const exceptionsLookup = new Set(
    CONFIGURATION[type].exceptions.map((date) => formatISO(date)),
  );
  const dataDates = await fetchConsumptionDates(type, startDate, endDate);
  const dataDatesLookup = new Set(dataDates.map((date) => formatISO(date)));
  const missingDates = generatedDates.filter(
    (date) =>
      !dataDatesLookup.has(formatISO(date)) &&
      !exceptionsLookup.has(formatISO(date)),
  );
  console.log(
    `Missing ${missingDates.length} dates for ${type}: ${JSON.stringify(missingDates, null, 2)}`,
  );
  return missingDates.length;
}
