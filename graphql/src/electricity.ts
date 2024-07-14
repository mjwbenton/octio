import { formatISO } from "date-fns";
import { ConsumptionDataPoint } from "./data/consumptionData";
import { GridDataPoint } from "./data/gridData";
import {
  Period,
  generateAllThirtyMinutePeriodsBetween,
} from "./generatePeriods";
import { WattHours, wattsToKilowattHours } from "./units";
import { formatNumber } from "./util";

function electricityPoint({
  usage,
  emissions,
  missingData,
  mix,
}: {
  usage: number;
  emissions: number;
  missingData: boolean;
  mix: Array<{ fuel: string; percentage: number }>;
}) {
  return {
    usage: formatNumber(usage),
    emissions: formatNumber(emissions),
    missingData,
    mix: mix.map(({ fuel, percentage }) => ({
      fuel,
      percentage: formatNumber(percentage, 1),
    })),
  };
}

export function electricityPointFromData(
  electricity?: ConsumptionDataPoint<WattHours>,
  grid?: GridDataPoint,
) {
  if (!electricity) {
    return electricityPoint({
      usage: 0,
      emissions: 0,
      missingData: true,
      mix: [],
    });
  }
  const consumptionKwH = wattsToKilowattHours(electricity.consumption);
  return electricityPoint({
    usage: consumptionKwH,
    emissions: ((grid?.intensity ?? 0) * consumptionKwH) / 1000,
    missingData: electricity === undefined || grid === undefined,
    mix: grid?.mix ?? [],
  });
}

export function electricityPointForPeriod(
  { startDate, endDate }: Period,
  consumptionData: Array<ConsumptionDataPoint<WattHours>>,
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
      const usage = point.consumption;
      const consumptionKwH = wattsToKilowattHours(usage);
      const grid = gridLookup.get(formatISO(point.startDate));
      acc.usage += usage;
      acc.emissions += (grid?.intensity ?? 0) * consumptionKwH;
      grid?.mix.forEach(({ fuel, percentage }) => {
        acc.fuelUsage[fuel] =
          (acc.fuelUsage[fuel] ?? 0) + usage * (percentage / 100);
      });
      return acc;
    },
    {
      usage: 0,
      emissions: 0,
      fuelUsage: {} as { [fuel: string]: number },
    },
  );

  return electricityPoint({
    usage: wattsToKilowattHours(totals.usage),
    emissions: totals.emissions / 1000,
    missingData: missingConsumptionData || missingGridData,
    mix: Object.entries(totals.fuelUsage).map(([fuel, usage]) => ({
      fuel,
      percentage: (usage / totals.usage) * 100,
    })),
  });
}
