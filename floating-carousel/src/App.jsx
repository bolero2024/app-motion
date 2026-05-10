// App.jsx
import React from "react";
import HeroCarousel from "./components/HeroCarousel";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0ede8" }}>
      <HeroCarousel
        title="What will you explore today?"
        subtitle="Drag to spin • ideas float into view"
        bg="#f0ede8"
        height={520}
      />

      {/* Demo section below carousel */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "48px 24px",
          fontFamily: "'Sora', 'Inter', sans-serif",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: "#1a1a1a",
            marginBottom: 12,
          }}
        >
          Floating Elliptical Cards Carousel
        </h2>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>
          Pure React · RAF-driven · GPU-accelerated · Drag + inertia physics ·
          No external carousel library
        </p>
      </div>
    </div>
  );
}
