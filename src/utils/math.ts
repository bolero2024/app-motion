// utils/math.ts — parametric ellipse helpers

/** Compute (x, y) on the ellipse for a given angle. */
export function ellipsePoint(angle: number, rx: number, ry: number): { x: number; y: number } {
  return {
    x: Math.cos(angle) * rx,
    y: Math.sin(angle) * ry,
  };
}

/** Linear interpolation between a and b by factor t ∈ [0, 1]. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Clamp v between min and max. */
export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Map a value from [inMin, inMax] → [outMin, outMax]. */
export function mapRange(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

/** Distribute N angles evenly around the ellipse [0, 2π). */
export function distributeAngles(n: number): number[] {
  return Array.from({ length: n }, (_, i) => (2 * Math.PI * i) / n);
}
