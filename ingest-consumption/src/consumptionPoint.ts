import { EnergyType } from "./energyType";

export type ConsumptionSource = "DIRECT" | "MINI";

export type ConsumptionPoint = {
  energyType: EnergyType;
  startDate: string;
  endDate: string;
  consumption: number;
  source: ConsumptionSource;
};
