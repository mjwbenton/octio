export function formatNumber(num: number | undefined): number {
  return Math.round((num ?? 0) * 1000) / 1000;
}
