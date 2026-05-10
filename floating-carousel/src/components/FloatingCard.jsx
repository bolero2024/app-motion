// components/FloatingCard.jsx
// A single card rendered at a position computed by the parent.
// Receives pre-computed style props so it never re-derives math.

import React, { memo } from "react";

const FloatingCard = memo(function FloatingCard({
  card,
  x,
  y,
  scale,
  opacity,
  blur,
  tilt,
  zIndex,
  cardWidth,
  cardHeight,
}) {
  const transform = `translate3d(${x - cardWidth / 2}px, ${y - cardHeight / 2}px, 0) scale(${scale}) rotate(${tilt}deg)`;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: cardWidth,
        height: cardHeight,
        transform,
        opacity,
        filter: blur > 0.2 ? `blur(${blur}px)` : "none",
        zIndex,
        willChange: "transform, opacity, filter",
        pointerEvents: "none",
      }}
    >
      {/* Glass card surface */}
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
            "0 10px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image / emoji area */}
        <div
          style={{
            flex: "0 0 62%",
            background: card.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: cardWidth * 0.22,
          }}
        >
          {card.emoji}
        </div>

        {/* Text body */}
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
              fontSize: cardWidth * 0.057,
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
                fontSize: cardWidth * 0.047,
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.2,
              }}
            >
              {card.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default FloatingCard;
