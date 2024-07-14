import { LITRES, WATT_HOURS } from "../units";

export enum EnergyType {
  ELECTRICITY = "ELECTRICITY",
  GAS = "GAS",
}

const UNITS_FOR_ENERGY_TYPE = {
  ELECTRICITY: [WATT_HOURS],
  GAS: [WATT_HOURS, LITRES],
} as const;

export type UnitsForEnergyType<T extends EnergyType> =
  (typeof UNITS_FOR_ENERGY_TYPE)[T][number];
