export function roundOff(num: number) {
  if (num >= 1e7) {
    return (num / 1e7).toFixed(2) + " Cr";
  }

  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + " K";
  }

  return num;
}
