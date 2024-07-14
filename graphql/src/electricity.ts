import { formatISO } from "date-fns";
import {
  ConsumptionDataPoint,
  assertUnitsOneOf,
  pointIsUnit,
} from "./data/consumptionData";
import { GridDataPoint } from "./data/gridData";
import {
  Period,
  generateAllThirtyMinutePeriodsBetween,
} from "./generatePeriods";
import {
  WATT_HOURS,
  WattHourConsumption,
  wattsToKilowattHours,
  withUnit,
} from "./units";
import { formatNumber } from "./util";

export function electricityPoint({
  usage,
  emissions,
  missingData,
  mix,
}: {
  usage: WattHourConsumption;
  emissions: number;
  missingData: boolean;
  mix: Array<{ fuel: string; percentage: number }>;
}) {
  return {
    usage: formatNumber(wattsToKilowattHours(usage)),
    emissions: formatNumber(emissions),
    missingData,
    mix: mix.map(({ fuel, percentage }) => ({
      fuel,
      percentage: formatNumber(percentage, 1),
    })),
  };
}

export function electricityPointFromData(
  electricity?: ConsumptionDataPoint,
  grid?: GridDataPoint,
) {
  if (!electricity) {
    return electricityPoint({
      usage: withUnit(WATT_HOURS, 0),
      emissions: 0,
      missingData: true,
      mix: [],
    });
  }
  if (!pointIsUnit(electricity, "WATT_HOURS")) {
    throw new Error("Electricity data is not in watt hours");
  }
  const consumptionKwH = wattsToKilowattHours(electricity.consumption);
  return electricityPoint({
    usage: electricity?.consumption ?? 0,
    emissions: ((grid?.intensity ?? 0) * consumptionKwH) / 1000,
    missingData: electricity === undefined || grid === undefined,
    mix: grid?.mix ?? [],
  });
}

export function electricityPointForPeriod(
  { startDate, endDate }: Period,
  consumptionData: Array<ConsumptionDataPoint>,
  gridData: Array<GridDataPoint>,
) {
  const electricityLookup = new Map(
    consumptionData.map((point) => [formatISO(point.startDate), point]),
  );
  const gridLookup = new Map(
    gridData.map((point) => [formatISO(point.startDate), point]),
  );
  const periods = generateAllThirtyMinutePeriodsBetween({ startDate, endDate });
  const missingConsumptionData = periods.some(
    ({ startDate }) => !electricityLookup.has(formatISO(startDate)),
  );
  const missingGridData = periods.some(
    ({ startDate }) => !gridLookup.has(formatISO(startDate)),
  );

  const totals = consumptionData.reduce(
    (acc, point) => {
      // TODO: Clean-up units here
      assertUnitsOneOf(point, WATT_HOURS);
      const usage = point.consumption;
      const consumptionKwH = wattsToKilowattHours(usage);
      const grid = gridLookup.get(formatISO(point.startDate));
      acc.usage = withUnit(WATT_HOURS, acc.usage + usage);
      acc.emissions += (grid?.intensity ?? 0) * consumptionKwH;
      grid?.mix.forEach(({ fuel, percentage }) => {
        acc.fuelUsage[fuel] =
          (acc.fuelUsage[fuel] ?? 0) + usage * (percentage / 100);
      });
      return acc;
    },
    {
      usage: 0 as WattHourConsumption,
      emissions: 0,
      fuelUsage: {} as { [fuel: string]: number },
    },
  );

  return electricityPoint({
    usage: totals.usage,
    emissions: totals.emissions / 1000,
    missingData: missingConsumptionData || missingGridData,
    mix: Object.entries(totals.fuelUsage).map(([fuel, usage]) => ({
      fuel,
      percentage: (usage / totals.usage) * 100,
    })),
  });
}
