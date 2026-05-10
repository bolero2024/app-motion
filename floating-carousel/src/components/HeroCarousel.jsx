// components/HeroCarousel.jsx
// Orchestrates the elliptical orbit, auto-rotation, drag physics,
// and depth rendering for all floating cards.

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import FloatingCard from "./FloatingCard";
import { useAutoRotate } from "../hooks/useAutoRotate";
import { useCarouselPhysics } from "../hooks/useCarouselPhysics";
import { ELLIPSE, CARD, ANIMATION } from "../constants";
import {
  ellipsePoint,
  lerp,
  mapRange,
  distributeAngles,
} from "../utils/math";
import { CARDS } from "../data/mockData";

// ─── Edge fade gradient overlay ───────────────────────────────────────────────
function EdgeFade({ bg }) {
  return (
    <>
      {/* left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "18%",
          height: "100%",
          background: `linear-gradient(to right, ${bg} 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 30,
        }}
      />
      {/* right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "18%",
          height: "100%",
          background: `linear-gradient(to left, ${bg} 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 30,
        }}
      />
      {/* bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "28%",
          background: `linear-gradient(to top, ${bg} 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 30,
        }}
      />
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroCarousel({
  title = "What will you explore today?",
  subtitle = "Drag to explore",
  bg = "#f0ede8",
  height = 520,
}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  // Shared mutable state — no re-renders on every RAF tick
  const velocityRef = useRef(ANIMATION.AUTO_SPEED);
  const isDraggingRef = useRef(false);

  // Card DOM refs — we mutate styles directly for 60fps performance
  const cardRefs = useRef([]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const RX = isMobile ? ELLIPSE.RX_MOBILE : ELLIPSE.RX_DESKTOP;
  const RY = isMobile ? ELLIPSE.RY_MOBILE : ELLIPSE.RY_DESKTOP;
  const CW = isMobile ? CARD.WIDTH_MOBILE : CARD.WIDTH_DESKTOP;
  const CH = isMobile ? CARD.HEIGHT_MOBILE : CARD.HEIGHT_DESKTOP;

  // Base angles — distributed evenly, computed once
  const baseAngles = useMemo(() => distributeAngles(CARDS.length), []);

  // ─── Per-frame rendering callback (no React state) ─────────────────────────
  const onFrame = useCallback(
    (angleOffset) => {
      const stage = stageRef.current;
      if (!stage) return;

      const stageW = stage.offsetWidth;
      const stageH = stage.offsetHeight;
      const cx = stageW / 2;
      const cy = stageH / 2;

      // Compute world positions for all cards
      const positions = baseAngles.map((base, i) => {
        const angle = base + angleOffset;
        const { x, y } = ellipsePoint(angle, RX, RY);
        // sinVal in [-1, 1]; remap so top-of-arc (sin≈-1) = 0, bottom (sin≈1) = 1
        // We want bottom to appear "deeper" (smaller, more transparent)
        const sinVal = Math.sin(angle); // -1 (top) → +1 (bottom)
        const depth = (sinVal + 1) / 2; // 0 (top/front) → 1 (bottom/back)

        const scale = lerp(ANIMATION.SCALE_MAX, ANIMATION.SCALE_MIN, depth);
        const opacity = lerp(ANIMATION.OPACITY_MAX, ANIMATION.OPACITY_MIN, depth);
        const blur = lerp(0, ANIMATION.MAX_BLUR, depth);
        const tilt = Math.cos(angle) * ANIMATION.MAX_TILT;
        const zIndex = Math.round(lerp(100, 1, depth));

        return { i, x: cx + x, y: cy + y, scale, opacity, blur, tilt, zIndex };
      });

      // Sort by zIndex so DOM order matches visual layering
      const sorted = [...positions].sort((a, b) => a.zIndex - b.zIndex);

      sorted.forEach(({ i, x, y, scale, opacity, blur, tilt, zIndex }) => {
        const el = cardRefs.current[i];
        if (!el) return;

        const tx = x - CW / 2;
        const ty = y - CH / 2;

        el.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${scale}) rotate(${tilt}deg)`;
        el.style.opacity = opacity;
        el.style.filter = blur > 0.3 ? `blur(${blur}px)` : "none";
        el.style.zIndex = zIndex;
      });
    },
    [baseAngles, RX, RY, CW, CH]
  );

  // ─── Hooks ─────────────────────────────────────────────────────────────────
  useAutoRotate({ onFrame, isDraggingRef, velocityRef });
  useCarouselPhysics({ containerRef, velocityRef, isDraggingRef });

  // ─── Cursor style ──────────────────────────────────────────────────────────
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const down = () => setDragging(true);
    const up = () => setDragging(false);
    el.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height,
        background: bg,
        overflow: "hidden",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        fontFamily: "'Sora', 'Inter', sans-serif",
      }}
    >
      {/* Hero text */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(26px, 3.5vw, 46px)",
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.8px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 14,
            fontWeight: 300,
            color: "#888",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Orbital stage — center is below viewport */}
      <div
        ref={stageRef}
        style={{
          position: "absolute",
          bottom: -ELLIPSE.CENTER_OFFSET_Y,
          left: 0,
          width: "100%",
          height: height + ELLIPSE.CENTER_OFFSET_Y,
          pointerEvents: "none",
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CW,
              height: CH,
              willChange: "transform, opacity, filter",
              pointerEvents: "none",
            }}
          >
            {/* Card inner — static, no style changes here */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.95)",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.07),0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Emoji / image area */}
              <div
                style={{
                  flex: "0 0 62%",
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: CW * 0.22,
                }}
              >
                {card.emoji}
              </div>
              {/* Text */}
              <div
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: CW * 0.057,
                    fontWeight: 500,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </p>
                {card.description && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: CW * 0.047,
                      fontWeight: 300,
                      color: "#999",
                      lineHeight: 1.2,
                    }}
                  >
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Atmospheric edge fades */}
      <EdgeFade bg={bg} />
    </div>
  );
}
