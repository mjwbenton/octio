import { addMinutes, formatISO, parseISO } from "date-fns";
import { ConsumptionPoint } from "./consumptionPoint";
import env from "./env";
import { GET_CONSUMPTION, GET_JWT } from "./queries";
import { DocumentNode } from "graphql";

const CONVERSION_FACTOR = 1_000;

const ENDPOINT = "https://api.octopus.energy/v1/graphql/";

export async function fetchMeterMini({
  from,
  to,
}: {
  from: Date;
  to: Date;
}): Promise<Array<ConsumptionPoint>> {
  const tokenResponse = await query(GET_JWT, { apiKey: env.OCTOPUS_API_KEY });
  const token = tokenResponse.data?.obtainKrakenToken.token;
  if (!token) {
    throw new Error("Failed to obtain token");
  }
  const dataResponse = await query(
    GET_CONSUMPTION,
    {
      startDate: formatISO(from),
      endDate: formatISO(to),
      electricityDeviceId: env.OCTOPUS_ELECTRICITY_DEVICE_ID,
      gasDeviceId: env.OCTOPUS_GAS_DEVICE_ID,
    },
    token,
  );
  console.log("Response: ", JSON.stringify(dataResponse, null, 2));
  const electricity: Array<ConsumptionPoint> =
    dataResponse.data?.electricity.map((item: any) => ({
      source: "MINI",
      energyType: "ELECTRICITY",
      startDate: formatISO(parseISO(item.readAt)),
      endDate: formatISO(addMinutes(parseISO(item.readAt), 30)),
      consumption: item.consumptionDelta / CONVERSION_FACTOR,
    }));
  const gas: Array<ConsumptionPoint> = dataResponse.data?.gas.map(
    (item: any) => ({
      source: "MINI",
      energyType: "GAS",
      startDate: formatISO(parseISO(item.readAt)),
      endDate: formatISO(addMinutes(parseISO(item.readAt), 30)),
      consumption: item.consumptionDelta / CONVERSION_FACTOR,
    }),
  );
  return [electricity, gas].flat();
}

async function query(
  query: DocumentNode,
  variables: Record<string, string>,
  authToken?: string,
): Promise<any> {
  console.log(
    "Querying",
    { query: query.loc!.source.body, variables },
    authToken,
  );
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer JWT ${authToken}` } : {}),
    },
    body: JSON.stringify({ query: query.loc!.source.body, variables }),
  });

  return response.json();
}
