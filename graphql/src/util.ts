export function formatNumber(
  num: number | undefined,
  decimals: number = 3,
): number {
  const pow = Math.pow(10, decimals);
  return Math.round((num ?? 0) * pow) / pow;
}
