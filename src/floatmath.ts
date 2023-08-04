function Approxmiate(
  value: number,
  check: number,
  precision: number = 0.00005
): boolean {
  return Math.abs(value - check) <= precision;
}

export { Approxmiate };
