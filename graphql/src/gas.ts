import { formatISO } from "date-fns";
import { ConsumptionDataPoint, pointIsUnit } from "./data/consumptionData";
import {
  Period,
  generateAllThirtyMinutePeriodsBetween,
} from "./generatePeriods";
import { EnergyPoint } from "./generated/graphql";
import {
  LITRES,
  Litres,
  WattHours,
  litresToWattHours,
  wattsToKilowattHours,
} from "./units";
import { formatNumber } from "./util";

// Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2023
const NATURAL_GAS_EMISSIONS_FACTOR = 203 / 1_000; // kgCO2e/kWh

function gasPoint({
  usage,
  emissions,
  missingData,
}: {
  usage: number;
  emissions: number;
  missingData: boolean;
}): EnergyPoint {
  return {
    usage: formatNumber(usage),
    missingData,
    emissions: formatNumber(emissions),
    mix: [
      {
        fuel: "gas",
        percentage: 100.0,
      },
    ],
  };
}

export function gasPointFromData(
  gas?: ConsumptionDataPoint<WattHours | Litres>
) {
  if (gas === undefined) {
    return gasPoint({ usage: 0, emissions: 0, missingData: true });
  }
  const usage = pointIsUnit(gas, LITRES)
    ? litresToWattHours(gas.consumption)
    : gas.consumption;
  return gasPoint({
    usage: wattsToKilowattHours(usage),
    emissions: wattsToKilowattHours(usage) * NATURAL_GAS_EMISSIONS_FACTOR,
    missingData: false,
  });
}

export function gasPointForPeriod(
  { startDate, endDate }: Period,
  data: Array<ConsumptionDataPoint>
) {
  const gasLookup = new Map(
    data.map((point) => [formatISO(point.startDate), point])
  );
  const missingData = generateAllThirtyMinutePeriodsBetween({
    startDate,
    endDate,
  }).some(({ startDate }) => !gasLookup.has(formatISO(startDate)));

  const totalUsage = data.reduce((acc, point) => {
    const usage = pointIsUnit(point, LITRES)
      ? litresToWattHours(point.consumption)
      : point.consumption;
    return acc + usage;
  }, 0);

  return gasPoint({
    usage: wattsToKilowattHours(totalUsage),
    emissions: wattsToKilowattHours(totalUsage) * NATURAL_GAS_EMISSIONS_FACTOR,
    missingData,
  });
}
