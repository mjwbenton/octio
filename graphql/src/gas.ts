import { ConsumptionDataPoint, pointIsUnit } from "./data/consumptionData";
import { EnergyPoint } from "./generated/graphql";
import {
  LITRES,
  WATT_HOURS,
  WattHourConsumption,
  litresToWattHours,
  withUnit,
  wattsToKilowattHours,
} from "./units";
import { formatNumber } from "./util";

// Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2023
const NATURAL_GAS_EMISSIONS_FACTOR = 203; // gCO2e/kWh

export function gasPoint({
  usage,
  missingData,
}: {
  usage: WattHourConsumption;
  missingData: boolean;
}): EnergyPoint {
  return {
    usage: formatNumber(wattsToKilowattHours(usage)),
    missingData,
    emissions: formatNumber(
      (wattsToKilowattHours(usage) * NATURAL_GAS_EMISSIONS_FACTOR) / 1000,
    ),
    mix: [
      {
        fuel: "gas",
        percentage: 100.0,
      },
    ],
  };
}

export function gasPointFromData(gas?: ConsumptionDataPoint) {
  if (gas === undefined) {
    return gasPoint({ usage: withUnit(WATT_HOURS, 0), missingData: true });
  }
  // Assumes all gas data not in litres is in watt hours
  const usage = pointIsUnit(gas, LITRES)
    ? litresToWattHours(gas.consumption)
    : withUnit(WATT_HOURS, gas.consumption);
  return gasPoint({
    usage,
    missingData: gas === undefined,
  });
}
