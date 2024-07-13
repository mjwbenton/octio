import { ConsumptionDataPoint, pointIsUnit } from "./data/consumptionData";
import { GridDataPoint } from "./data/gridData";
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
