export function roundOff(val: number | string) {
  const num = typeof val === "number" ? val : parseFloat(val);

  if (num >= 1e7) {
    return (num / 1e7).toFixed(2) + " Cr";
  }

  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + " K";
  }

  return num;
}
