// hooks/useCarouselPhysics.js
// Handles mouse + touch drag events and injects velocity into the shared ref.

import { useRef, useCallback, useEffect } from "react";

/**
 * @param {Object} opts
 * @param {React.RefObject} opts.containerRef  — the element to attach listeners to
 * @param {React.MutableRefObject<number>} opts.velocityRef — shared velocity ref
 * @param {React.MutableRefObject<boolean>} opts.isDraggingRef
 */
export function useCarouselPhysics({ containerRef, velocityRef, isDraggingRef }) {
  const lastXRef = useRef(null);
  const lastVelRef = useRef(0);

  // ─── Pointer helpers ───────────────────────────────────────────────────────

  const onDragStart = useCallback((clientX) => {
    isDraggingRef.current = true;
    lastXRef.current = clientX;
    lastVelRef.current = 0;
  }, [isDraggingRef]);

  const onDragMove = useCallback(
    (clientX) => {
      if (!isDraggingRef.current || lastXRef.current === null) return;
      const dx = clientX - lastXRef.current;
      // Convert pixel delta → angular velocity (radians/s at 60fps baseline)
      const angular = dx * 0.001 * 60;
      lastVelRef.current = angular;
      velocityRef.current = angular;
      lastXRef.current = clientX;
    },
    [isDraggingRef, velocityRef]
  );

  const onDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    // Hand off last measured velocity to the inertia system
    velocityRef.current = lastVelRef.current;
  }, [isDraggingRef, velocityRef]);

  // ─── Mouse ────────────────────────────────────────────────────────────────

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      onDragStart(e.clientX);
    },
    [onDragStart]
  );

  const handleMouseMove = useCallback(
    (e) => onDragMove(e.clientX),
    [onDragMove]
  );

  const handleMouseUp = useCallback(() => onDragEnd(), [onDragEnd]);

  // ─── Touch ────────────────────────────────────────────────────────────────

  const handleTouchStart = useCallback(
    (e) => onDragStart(e.touches[0].clientX),
    [onDragStart]
  );

  const handleTouchMove = useCallback(
    (e) => onDragMove(e.touches[0].clientX),
    [onDragMove]
  );

  const handleTouchEnd = useCallback(() => onDragEnd(), [onDragEnd]);

  // ─── Attach listeners ─────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);
}
