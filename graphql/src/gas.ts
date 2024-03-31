import { ConsumptionDataPoint } from "./data/consumptionData";
import { EnergyPoint } from "./generated/graphql";
import { formatNumber } from "./util";

// Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2023
const NATURAL_GAS_EMISSIONS_FACTOR = 203; // gCO2e/kWh

export function gasPoint({
  usage,
  missingData,
}: {
  usage: number;
  missingData: boolean;
}): EnergyPoint {
  return {
    usage: formatNumber(usage),
    missingData,
    emissions: formatNumber((usage * NATURAL_GAS_EMISSIONS_FACTOR) / 1000),
    mix: [
      {
        fuel: "gas",
        percentage: 100.0,
      },
    ],
  };
}

export function gasPointFromData(gas?: ConsumptionDataPoint) {
  return gasPoint({
    usage: gas?.consumption ?? 0,
    missingData: gas === undefined,
  });
}
