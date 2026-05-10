// hooks/useAutoRotate.js
// Drives continuous auto-rotation when the user is not dragging.
// Returns a ref to the current angle offset so consumers can read it
// without causing re-renders on every frame.

import { useRef, useEffect, useCallback } from "react";
import { ANIMATION } from "../constants";

/**
 * @param {Object} opts
 * @param {Function} opts.onFrame  — called each RAF tick with (angleOffset, dt)
 * @param {React.MutableRefObject<boolean>} opts.isDraggingRef
 * @param {React.MutableRefObject<number>}  opts.velocityRef
 */
export function useAutoRotate({ onFrame, isDraggingRef, velocityRef }) {
  const angleOffsetRef = useRef(0);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);

  const tick = useCallback(
    (now) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const dragging = isDraggingRef.current;

      if (!dragging) {
        // Smoothly ease velocity toward the target auto-speed
        velocityRef.current +=
          (ANIMATION.AUTO_SPEED - velocityRef.current) * ANIMATION.RESUME_EASE;
      }

      // Decay — applied always so drag-released inertia fades naturally
      if (dragging) {
        velocityRef.current *= 0.88; // heavy damping while dragging
      } else {
        velocityRef.current *= ANIMATION.INERTIA_DECAY;
      }

      angleOffsetRef.current += velocityRef.current * dt;

      onFrame(angleOffsetRef.current, dt);

      rafRef.current = requestAnimationFrame(tick);
    },
    [onFrame, isDraggingRef, velocityRef]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return angleOffsetRef;
}
