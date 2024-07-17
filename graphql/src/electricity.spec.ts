import { addMinutes } from "date-fns";
import { EnergyType } from "./data/energyType";
import {
  electricityPointForPeriod,
  electricityPointFromData,
} from "./electricity";

const BASE_POINT = {
  startDate: new Date("2021-01-01T00:00:00Z"),
  endDate: new Date("2021-01-01T00:30:00Z"),
  energyType: EnergyType.ELECTRICITY,
  unit: "WATT_HOURS" as const,
};

describe("electricity", () => {
  describe("electricityPointFromData", () => {
    it("should return an electricity point with usage 0, emissions 0, and missingData true if electricity is undefined", () => {
      const result = electricityPointFromData(undefined, undefined);
      expect(result).toEqual({
        usage: 0,
        emissions: 0,
        missingData: true,
        mix: [],
      });
    });
    it("should convert an electricity point with no grid data", () => {
      const result = electricityPointFromData(
        {
          ...BASE_POINT,
          consumption: 1000,
        },
        undefined,
      );
      expect(result).toEqual({
        usage: 1,
        emissions: 0,
        missingData: true,
        mix: [],
      });
    });

    it("should convert an electricity point with grid data", () => {
      const result = electricityPointFromData(
        {
          ...BASE_POINT,
          consumption: 1000,
        },
        {
          startDate: BASE_POINT.startDate,
          endDate: BASE_POINT.endDate,
          intensity: 200,
          mix: [
            { fuel: "solar", percentage: 50 },
            { fuel: "wind", percentage: 50 },
          ],
        },
      );
      expect(result).toEqual({
        usage: 1,
        emissions: 0.2,
        missingData: false,
        mix: [
          { fuel: "solar", percentage: 50 },
          { fuel: "wind", percentage: 50 },
        ],
      });
    });
  });

  describe("electricityPointForPeriod", () => {
    it("should return an electricity point with usage 0, emissions 0, and missingData true if there is no data", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 30);
      const result = electricityPointForPeriod({ startDate, endDate }, [], []);
      expect(result).toEqual({
        usage: 0,
        emissions: 0,
        missingData: true,
        mix: [],
      });
    });

    it("should set missing data if there is a gap in grid data", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 30);
      const result = electricityPointForPeriod(
        { startDate, endDate },
        [
          {
            ...BASE_POINT,
            consumption: 1_000,
            startDate: addMinutes(startDate, 0),
            endDate: addMinutes(startDate, 30),
          },
        ],
        [],
      );
      expect(result).toEqual({
        usage: 1,
        emissions: 0,
        missingData: true,
        mix: [],
      });
    });

    it("should set missing data if there is a gap in consumption data", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 30);
      const result = electricityPointForPeriod(
        { startDate, endDate },
        [],
        [
          {
            startDate: startDate,
            endDate: endDate,
            intensity: 200,
            mix: [
              { fuel: "solar", percentage: 50 },
              { fuel: "wind", percentage: 50 },
            ],
          },
        ],
      );
      expect(result).toEqual({
        usage: 0,
        emissions: 0,
        missingData: true,
        mix: [],
      });
    });

    it("should combine multiple points correctly", () => {
      const startDate = new Date("2021-01-01T00:00:00Z");
      const endDate = addMinutes(startDate, 60);
      const result = electricityPointForPeriod(
        { startDate, endDate },
        [
          {
            ...BASE_POINT,
            consumption: 1_000,
            startDate: addMinutes(startDate, 0),
            endDate: addMinutes(startDate, 30),
          },
          {
            ...BASE_POINT,
            consumption: 1_000,
            startDate: addMinutes(startDate, 30),
            endDate: addMinutes(startDate, 60),
          },
        ],
        [
          {
            startDate,
            endDate: addMinutes(startDate, 30),
            intensity: 200,
            mix: [
              { fuel: "solar", percentage: 75 },
              { fuel: "wind", percentage: 25 },
            ],
          },
          {
            startDate: addMinutes(startDate, 30),
            endDate: addMinutes(startDate, 60),
            intensity: 200,
            mix: [
              { fuel: "solar", percentage: 25 },
              { fuel: "wind", percentage: 75 },
            ],
          },
        ],
      );
      expect(result).toEqual({
        usage: 2,
        emissions: 0.4,
        missingData: false,
        mix: [
          { fuel: "solar", percentage: 50 },
          { fuel: "wind", percentage: 50 },
        ],
      });
    });
  });
});
