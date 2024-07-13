import { generateAllThirtyMinutePeriodsBetween } from "./generatePeriods";

describe("generateAllThirtyMinutePeriodsBetween", () => {
  it("should generate all thirty minute periods between two dates", () => {
    const startDate = new Date("2021-01-01T00:00:00Z");
    const endDate = new Date("2021-01-01T01:00:00Z");
    const periods = generateAllThirtyMinutePeriodsBetween({
      startDate,
      endDate,
    });
    expect(periods).toEqual([
      {
        startDate: new Date("2021-01-01T00:00:00Z"),
        endDate: new Date("2021-01-01T00:30:00Z"),
      },
      {
        startDate: new Date("2021-01-01T00:30:00Z"),
        endDate: new Date("2021-01-01T01:00:00Z"),
      },
    ]);
  });
});
