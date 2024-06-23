export const LITRES = "LITRES";
export const WATT_HOURS = "WATT_HOURS";
export const KILOWATT_HOURS = "KILOWATT_HOURS";

export type ConsumptionUnit =
  | typeof LITRES
  | typeof WATT_HOURS
  | typeof KILOWATT_HOURS;

export type Consumption<T extends ConsumptionUnit> = number & { _unit: T };
export type LitreConsumption = Consumption<typeof LITRES>;
export type WattHourConsumption = Consumption<typeof WATT_HOURS>;
export type KilowattHourConsumption = Consumption<typeof KILOWATT_HOURS>;

export function wattsToKilowattHours(
  watts: WattHourConsumption,
): KilowattHourConsumption {
  return (watts / 1000) as KilowattHourConsumption;
}

const CALORIFIC_VALUE = 39.2;
const VOLUME_CORRECTION = 1.02264;
const MJ_TO_WH = 1000 / 3.6;
const LITRES_TO_CUBIC_METRES = 0.001;

export function litresToWattHours(
  litres: LitreConsumption,
): WattHourConsumption {
  return (litres *
    LITRES_TO_CUBIC_METRES *
    VOLUME_CORRECTION *
    CALORIFIC_VALUE *
    MJ_TO_WH) as WattHourConsumption;
}

export function withUnit<T extends ConsumptionUnit>(
  unit: T,
  value: number,
): Consumption<T> {
  return value as Consumption<T>;
}
