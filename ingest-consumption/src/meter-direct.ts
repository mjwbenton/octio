import { formatISO, parseISO } from "date-fns";
import { EnergyType } from "./energyType";
import env from "./env";
import { ConsumptionPoint } from "./consumptionPoint";

const CONSUMPTION_SOURCE = "DIRECT";

const ENERGY_TYPE_CONFIG = {
  ELECTRICITY: {
    endpoint: `https://api.octopus.energy/v1/electricity-meter-points/${env.OCTOPUS_ELECTRICITY_MPAN}/meters/${env.OCTOPUS_ELECTRICITY_SERIAL}/consumption/`,
  },
  GAS: {
    endpoint: `https://api.octopus.energy/v1/gas-meter-points/${env.OCTOPUS_GAS_MPRN}/meters/${env.OCTOPUS_GAS_SERIAL}/consumption/`,
  },
} as const;

const HEADERS = {
  Authorization: `Basic ${Buffer.from(env.OCTOPUS_API_KEY + ":").toString("base64")}`,
};

const OCTOPUS_PAGE_SIZE = 25_000;

type InputDataType = {
  interval_start: string;
  interval_end: string;
  consumption: number;
};

export async function fetchMeterDirect(
  type: EnergyType,
  { from, to }: { from: Date; to: Date }
): Promise<Array<ConsumptionPoint>> {
  const url = `${ENERGY_TYPE_CONFIG[type].endpoint}?page_size=${OCTOPUS_PAGE_SIZE}&period_from=${formatISO(from)}&period_to=${formatISO(to)}`;
  console.log(`Fetching ${type} data from ${url}`);
  const response = await fetch(url, {
    headers: HEADERS,
  });
  const result = (await response.json()) as { results: Array<InputDataType> };
  return result.results.map((item) => ({
    energyType: type,
    startDate: formatISO(parseISO(item.interval_start)),
    endDate: formatISO(parseISO(item.interval_end)),
    consumption: item.consumption,
    source: CONSUMPTION_SOURCE,
  }));
}
