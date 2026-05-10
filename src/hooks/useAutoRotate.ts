// hooks/useAutoRotate.ts
// Drives continuous auto-rotation when the user is not dragging.
// Returns a ref to the current angle offset so consumers can read it
// without causing re-renders on every frame.

import { type MutableRefObject, useRef, useEffect } from "react";
import { ANIMATION } from "../constants";

interface UseAutoRotateOptions {
  onFrame: (angleOffset: number, dt: number) => void;
  isDraggingRef: MutableRefObject<boolean>;
  velocityRef: MutableRefObject<number>;
}

export function useAutoRotate({ onFrame, isDraggingRef, velocityRef }: UseAutoRotateOptions): MutableRefObject<number> {
  const angleOffsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  // Intro ease starts high for a fast deceleration, then decays to RESUME_EASE
  const introEaseRef = useRef<number>(ANIMATION.INTRO_EASE_START);
  // Per-frame decay factor derived from INTRO_DURATION at ~60fps — stable, no deps
  const introDecay = useRef(
    Math.pow(
      ANIMATION.RESUME_EASE / ANIMATION.INTRO_EASE_START,
      1 / (ANIMATION.INTRO_DURATION * 60),
    ),
  );

  // Keep a stable ref to the latest onFrame so the RAF loop never stales
  const onFrameRef = useRef(onFrame);
  useEffect(() => { onFrameRef.current = onFrame; }, [onFrame]);

  useEffect(() => {
    const tick = (now: number): void => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const dragging = isDraggingRef.current;

      if (!dragging) {
        // Decay the intro ease toward RESUME_EASE over INTRO_DURATION seconds
        introEaseRef.current = Math.max(
          ANIMATION.RESUME_EASE,
          introEaseRef.current * introDecay.current,
        );
        velocityRef.current +=
          (ANIMATION.AUTO_SPEED - velocityRef.current) * introEaseRef.current;
      } else {
        // Reset intro ease on drag so post-drag resume is also smooth
        introEaseRef.current = ANIMATION.INTRO_EASE_START;
      }

      velocityRef.current *= dragging ? 0.88 : ANIMATION.INERTIA_DECAY;

      angleOffsetRef.current += velocityRef.current * dt;
      onFrameRef.current(angleOffsetRef.current, dt);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDraggingRef, velocityRef]);

  return angleOffsetRef;
}
