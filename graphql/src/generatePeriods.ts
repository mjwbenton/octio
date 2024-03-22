import { addMinutes } from "date-fns/addMinutes";

export function generateAllThirtyMinutePeriodsBetween(
  startDate: Date,
  endDate: Date,
): Array<Date> {
  const periods = [];
  let currentPeriod = startDate;
  while (currentPeriod < endDate) {
    periods.push(currentPeriod);
    currentPeriod = addMinutes(currentPeriod, 30);
  }
  return periods;
}
