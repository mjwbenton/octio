import { addMinutes } from "date-fns";
import { EnergyType } from "./data/energyType";
import { gasPointForPeriod, gasPointFromData } from "./gas";

const BASE_POINT = {
  startDate: new Date("2021-01-01T00:00:00Z"),
  endDate: new Date("2021-01-01T00:30:00Z"),
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

  describe("gasPointForPeriod", () => {
    it("should return a gas point with usage 0, emissions 0, and missingData true if there is no data", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 30);
      const result = gasPointForPeriod({ startDate, endDate }, []);
      expect(result).toEqual({
        usage: 0,
        emissions: 0,
        missingData: true,
        mix: [{ fuel: "gas", percentage: 100.0 }],
      });
    });
    it("should return a gas point combining watt hours and litres data", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 60);
      const result = gasPointForPeriod({ startDate, endDate }, [
        {
          ...BASE_POINT,
          consumption: 1_000,
          unit: "WATT_HOURS",
          startDate: addMinutes(startDate, 0),
          endDate: addMinutes(startDate, 30),
        },
        {
          ...BASE_POINT,
          consumption: 1_000,
          unit: "LITRES",
          startDate: addMinutes(startDate, 30),
          endDate: addMinutes(startDate, 60),
        },
      ]);
      expect(result).toEqual({
        usage: 12.135,
        emissions: 2.463,
        missingData: false,
        mix: [{ fuel: "gas", percentage: 100.0 }],
      });
    });
    it("should set missing data if there is a gap in the data", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 60);
      const result = gasPointForPeriod({ startDate, endDate }, [
        {
          ...BASE_POINT,
          consumption: 1_000,
          unit: "WATT_HOURS",
          startDate: addMinutes(startDate, 0),
          endDate: addMinutes(startDate, 30),
        },
      ]);
      expect(result).toEqual({
        usage: 1,
        emissions: 0.203,
        missingData: true,
        mix: [{ fuel: "gas", percentage: 100.0 }],
      });
    });
  });
});
