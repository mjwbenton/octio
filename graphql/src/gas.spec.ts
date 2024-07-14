import { EnergyType } from "./data/energyType";
import { gasPointFromData } from "./gas";

const START_DATE = new Date("2021-01-01T00:00:00Z");
const END_DATE = new Date("2021-01-01T00:30:00Z");

const BASE_POINT = {
  startDate: START_DATE,
  endDate: END_DATE,
  energyType: EnergyType.GAS,
};

describe("gas", () => {
  describe("gasPointFromData", () => {
    it("should return a gas point with usage 0, emissions 0, and missingData true if gas is undefined", () => {
      const result = gasPointFromData(undefined);
      expect(result).toEqual({
        usage: 0,
        emissions: 0,
        missingData: true,
        mix: [{ fuel: "gas", percentage: 100.0 }],
      });
    });
    it("should convert a watt hours gas point", () => {
      const result = gasPointFromData({
        ...BASE_POINT,
        consumption: 1000,
        unit: "WATT_HOURS",
      });
      expect(result).toEqual({
        usage: 1,
        emissions: 0.203,
        missingData: false,
        mix: [{ fuel: "gas", percentage: 100.0 }],
      });
    });
    it("should convert a litres gas point", () => {
      const result = gasPointFromData({
        ...BASE_POINT,
        consumption: 1_000,
        unit: "LITRES",
      });
      expect(result).toEqual({
        usage: 11.135,
        emissions: 2.26,
        missingData: false,
        mix: [{ fuel: "gas", percentage: 100.0 }],
      });
    });
  });
});
