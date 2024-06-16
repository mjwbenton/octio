import { addDays, addMinutes, isBefore, parseISO } from "date-fns";
import { ConsumptionPoint } from "./consumptionPoint";
import env from "./env";
import { GET_CONSUMPTION, GET_JWT } from "./queries";
import {
  GetConsumptionDataQuery,
  GetConsumptionDataQueryVariables,
  GetJwtMutation,
} from "./generated/graphql";
import { query } from "./graphqlQuery";
import { EnergyType } from "./energyType";

const CONSUMPTION_SOURCE = "MINI";

export async function fetchMeterMini({
  from,
  to,
}: {
  from: Date;
  to: Date;
}): Promise<Array<ConsumptionPoint>> {
  const tokenResponse = await query<GetJwtMutation>(GET_JWT, {
    apiKey: env.OCTOPUS_API_KEY,
  });
  const token = tokenResponse.obtainKrakenToken?.token;
  if (!token) {
    throw new Error("Failed to obtain token");
  }

  const consumptionPoints = [];
  let currentFrom = from;
  let currentTo = from;
  let more = true;
  while (more) {
    currentFrom = currentTo;
    currentTo = addDays(currentTo, 3);
    if (isBefore(to, currentTo)) {
      currentTo = to;
      more = false;
    }
    const data = await queryConsumption(currentFrom, currentTo, token);
    consumptionPoints.push(...data);
  }

  return consumptionPoints;
}

async function queryConsumption(
  startDate: Date,
  endDate: Date,
  authToken: string,
) {
  const dataResponse = await query<GetConsumptionDataQuery>(
    GET_CONSUMPTION,
    {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      electricityDeviceId: env.OCTOPUS_ELECTRICITY_DEVICE_ID,
      gasDeviceId: env.OCTOPUS_GAS_DEVICE_ID,
    } satisfies GetConsumptionDataQueryVariables,
    authToken,
  );
  const electricity: Array<ConsumptionPoint | null> =
    dataResponse.electricity?.map((item) =>
      item ? graphqlToConsumptionPoint("ELECTRICITY", item) : null,
    ) ?? [];
  const gas: Array<ConsumptionPoint | null> =
    dataResponse.gas?.map((item) =>
      item ? graphqlToConsumptionPoint("GAS", item) : null,
    ) ?? [];
  return [electricity, gas]
    .flat()
    .filter((item) => item != null) as Array<ConsumptionPoint>;
}

function graphqlToConsumptionPoint(
  energyType: EnergyType,
  graphqlItem: NonNullable<
    NonNullable<GetConsumptionDataQuery["electricity"]>[number]
  >,
): ConsumptionPoint {
  return {
    source: CONSUMPTION_SOURCE,
    energyType,
    startDate: parseISO(graphqlItem.readAt).toISOString(),
    endDate: addMinutes(parseISO(graphqlItem.readAt), 30).toISOString(),
    consumption: graphqlItem.consumptionDelta,
  };
}
