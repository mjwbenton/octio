export const LITRES = "LITRES";
export const WATT_HOURS = "WATT_HOURS";

export type WattHours = typeof WATT_HOURS;
export type Litres = typeof LITRES;

export type ConsumptionUnit = typeof LITRES | typeof WATT_HOURS;

export function wattsToKilowattHours(watts: number): number {
  return watts / 1000;
}

const CALORIFIC_VALUE = 39.2;
const VOLUME_CORRECTION = 1.02264;
const MJ_TO_WH = 1000 / 3.6;
const LITRES_TO_CUBIC_METRES = 0.001;

export function litresToWattHours(litres: number): number {
  return (
    litres *
    LITRES_TO_CUBIC_METRES *
    VOLUME_CORRECTION *
    CALORIFIC_VALUE *
    MJ_TO_WH
  );
}
