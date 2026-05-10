
//! https://www.microsoft.com/fr-fr/edge/copilot?form=MT01FK&cs=3767699375&profile=personal

// constants.ts — ellipse geometry & animation config

export const ELLIPSE = {
  // Horizontal radius — wide orbit (vw-relative, set in px at runtime)
  RX_DESKTOP: 1200,
  RX_MOBILE: 200,

  // Vertical radius — shallow arc for the "floating tray" look
  RY_DESKTOP: 750,
  RY_MOBILE: 110,

  // How far below the visible area the ellipse center sits (px)
  CENTER_OFFSET_Y: 1500,
};

export const CARD = {
  WIDTH_DESKTOP: 380,
  HEIGHT_DESKTOP: 330,
  WIDTH_MOBILE: 150,
  HEIGHT_MOBILE: 190,
  RADIUS: 56,
};

export const ANIMATION = {
  // Auto-rotate speed (radians per second)
  AUTO_SPEED: 0.18,

  // Initial speed on mount — decelerates to AUTO_SPEED over ~3s
  INITIAL_SPEED: 1.4,

  // Duration (seconds) of the initial deceleration phase
  INTRO_DURATION: 3,

  // Starting ease value for the intro deceleration (higher = faster initial pull)
  INTRO_EASE_START: 0.06,

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
  MAX_TILT: 30,

  // Max blur (px) for deepest cards
  MAX_BLUR: 5.5,
};
