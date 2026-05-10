// hooks/useCarouselPhysics.ts
// Handles mouse + touch drag events and injects velocity into the shared ref.

import { type MutableRefObject, type RefObject, useRef, useCallback, useEffect } from "react";

interface UseCarouselPhysicsOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  velocityRef: MutableRefObject<number>;
  isDraggingRef: MutableRefObject<boolean>;
}

export function useCarouselPhysics({ containerRef, velocityRef, isDraggingRef }: UseCarouselPhysicsOptions): void {
  const lastXRef = useRef<number | null>(null);
  const lastVelRef = useRef<number>(0);

  const onDragStart = useCallback((clientX: number): void => {
    isDraggingRef.current = true;
    lastXRef.current = clientX;
    lastVelRef.current = 0;
  }, [isDraggingRef]);

  const onDragMove = useCallback(
    (clientX: number): void => {
      if (!isDraggingRef.current || lastXRef.current === null) return;
      const dx = clientX - lastXRef.current;
      const angular = dx * 0.001 * 60;
      lastVelRef.current = angular;
      velocityRef.current = angular;
      lastXRef.current = clientX;
    },
    [isDraggingRef, velocityRef]
  );

  const onDragEnd = useCallback((): void => {
    isDraggingRef.current = false;
    velocityRef.current = lastVelRef.current;
  }, [isDraggingRef, velocityRef]);

  const handleMouseDown = useCallback(
    (e: MouseEvent): void => { e.preventDefault(); onDragStart(e.clientX); },
    [onDragStart]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent): void => onDragMove(e.clientX),
    [onDragMove]
  );

  const handleMouseUp = useCallback((): void => onDragEnd(), [onDragEnd]);

  const handleTouchStart = useCallback(
    (e: TouchEvent): void => onDragStart(e.touches[0].clientX),
    [onDragStart]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent): void => onDragMove(e.touches[0].clientX),
    [onDragMove]
  );

  const handleTouchEnd = useCallback((): void => onDragEnd(), [onDragEnd]);

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
  }, [containerRef, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd]);
}
