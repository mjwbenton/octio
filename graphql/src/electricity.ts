import { ConsumptionDataPoint } from "./data/consumptionData";
import { GridDataPoint } from "./data/gridData";
import { formatNumber } from "./util";

export function electricityPointFromData(
  electricity?: ConsumptionDataPoint,
  grid?: GridDataPoint,
) {
  return electricityPoint({
    usage: electricity?.consumption ?? 0,
    emissions:
      ((grid?.intensity ?? 0) * (electricity?.consumption ?? 0)) / 1000,
    missingData: electricity === undefined || grid === undefined,
    mix: grid?.mix ?? [],
  });
}

export function electricityPoint({
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
