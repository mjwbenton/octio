import { formatISO } from "date-fns";
import {
  ConsumptionDataPoint,
  assertUnitsOneOf,
  pointIsUnit,
} from "./data/consumptionData";
import {
  Period,
  generateAllThirtyMinutePeriodsBetween,
} from "./generatePeriods";
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
  if (pointIsUnit(gas, LITRES)) {
    return gasPoint({
      usage: litresToWattHours(gas.consumption),
      missingData: false,
    });
  }
  if (pointIsUnit(gas, WATT_HOURS)) {
    return gasPoint({
      usage: gas.consumption,
      missingData: false,
    });
  }
  throw new Error("Gas data is not in litres or watt hours");
}

export function gasPointForPeriod(
  { startDate, endDate }: Period,
  data: Array<ConsumptionDataPoint>,
) {
  const gasLookup = new Map(
    data.map((point) => [formatISO(point.startDate), point]),
  );
  const missingData = generateAllThirtyMinutePeriodsBetween({
    startDate,
    endDate,
  }).some(({ startDate }) => !gasLookup.has(formatISO(startDate)));

  const totals = data.reduce(
    (acc, point) => {
      // TODO: Clean-up units here
      assertUnitsOneOf(point, WATT_HOURS, LITRES);
      const usage = pointIsUnit(point, LITRES)
        ? litresToWattHours(point.consumption)
        : (point.consumption as WattHourConsumption);
      acc.usage = withUnit(WATT_HOURS, acc.usage + usage);
      return acc;
    },
    { usage: 0 as WattHourConsumption },
  );

  return gasPoint({
    usage: totals.usage,
    missingData,
  });
}
