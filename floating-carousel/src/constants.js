// constants.js — ellipse geometry & animation config

export const ELLIPSE = {
  // Horizontal radius — wide orbit (vw-relative, set in px at runtime)
  RX_DESKTOP: 440,
  RX_MOBILE: 200,

  // Vertical radius — shallow arc for the "floating tray" look
  RY_DESKTOP: 190,
  RY_MOBILE: 110,

  // How far below the visible area the ellipse center sits (px)
  CENTER_OFFSET_Y: 260,
};

export const CARD = {
  WIDTH_DESKTOP: 210,
  HEIGHT_DESKTOP: 260,
  WIDTH_MOBILE: 150,
  HEIGHT_MOBILE: 190,
};

export const ANIMATION = {
  // Auto-rotate speed (radians per second)
  AUTO_SPEED: 0.18,

  // How quickly idle rotation resumes after drag release (0-1 easing factor)
  RESUME_EASE: 0.012,

  // Drag momentum decay per frame (0 = instant stop, 1 = no decay)
  INERTIA_DECAY: 0.94,

  // Depth scale range [min, max] — cards shrink as they descend
  SCALE_MIN: 0.52,
  SCALE_MAX: 1.0,

  // Opacity range
  OPACITY_MIN: 0.2,
  OPACITY_MAX: 1.0,

  // Max tilt in degrees based on horizontal position
  MAX_TILT: 7,

  // Max blur (px) for deepest cards
  MAX_BLUR: 3.5,
};
