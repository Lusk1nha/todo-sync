export function delayMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateArray(length: number) {
  return Array.from({ length }, (_, index) => index);
}

export function generateNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
