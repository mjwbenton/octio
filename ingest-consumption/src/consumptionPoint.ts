import { EnergyType } from "./energyType";

export type ConsumptionPoint = {
  energyType: EnergyType;
  startDate: string;
  endDate: string;
  consumption: number;
};
