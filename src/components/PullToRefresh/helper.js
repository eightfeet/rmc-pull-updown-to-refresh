export function almostEqual(a, b, epsilon) {
  return Math.abs(a - b) < epsilon;
}

export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function slope(x, y, angle) {
  const left = Math.abs(y) / Math.abs(x);
  const right = Math.tan(toRadians(angle));

  if (almostEqual(left, right, Number.EPSILON)) {
    return 0;
  }

  return left > right ? 1 : -1;
}
