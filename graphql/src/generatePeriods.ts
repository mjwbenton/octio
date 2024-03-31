import { addMinutes } from "date-fns/addMinutes";

export type Period = {
  startDate: Date;
  endDate: Date;
};

export function generateAllThirtyMinutePeriodsBetween({
  startDate,
  endDate,
}: Period): Array<Period> {
  const periods = [];
  let currentPeriod = startDate;
  while (currentPeriod < endDate) {
    const newEnd = addMinutes(currentPeriod, 30);
    periods.push({ startDate: currentPeriod, endDate: newEnd });
    currentPeriod = newEnd;
  }
  return periods;
}
