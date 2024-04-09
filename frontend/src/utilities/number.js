export function formatNumberWithCommas(value) {
  return value.toLocaleString();
}

export function getPercent(numerator, denominator) {
  const decimal = numerator / denominator;
  const percent = decimal * 100;

  return percent;
}
export function generateRandom10DigitNumber() {
  const min = 1000000000; // Minimum 10-digit number (1 followed by 9 zeros)
  const max = 9999999999; // Maximum 10-digit number (9 nines)

  // Generate a random integer between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}
