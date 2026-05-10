// utils/math.js — parametric ellipse helpers

/**
 * Compute (x, y) on the ellipse for a given angle.
 * x = cos(θ) * rx
 * y = sin(θ) * ry
 */
export function ellipsePoint(angle, rx, ry) {
  return {
    x: Math.cos(angle) * rx,
    y: Math.sin(angle) * ry,
  };
}

/**
 * Linear interpolation between a and b by factor t ∈ [0, 1].
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp v between min and max.
 */
export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Map a value from [inMin, inMax] → [outMin, outMax].
 */
export function mapRange(v, inMin, inMax, outMin, outMax) {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

/**
 * Distribute N angles evenly around the ellipse [0, 2π).
 */
export function distributeAngles(n) {
  return Array.from({ length: n }, (_, i) => (2 * Math.PI * i) / n);
}
