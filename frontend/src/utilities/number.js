export function formatNumberWithCommas(value) {
  return value.toLocaleString();
}

export function getPercent(numerator, denominator) {
  const decimal = numerator / denominator;
  const percent = decimal * 100;

  return percent;
}
