// App.jsx
// import React from "react";
 
import { motion, type Variants } from "framer-motion";
import HeroCarousel from "./components/HeroCarousel";
import NavBar from "./components/NavBar";
import ServicesComponent from "./components/Services";
// import SwitchCarousel from "./components/SwitchCarousel";


const blockVariant: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: -10,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function App() {
  return (
    // Outer wrapper with background color
    <div style={{ minHeight: "100vh", width: "100vw", background: "rgb(240, 232, 229)" , overflowX: "hidden" }}>

      {/* <NavBar /> */}
      <NavBar />

      {/* Switch Buttons */}
      {/* <SwitchCarousel /> */}
      {/* .... CAROUSEL .... */}
      <motion.div
        className="flex-col px-4 py-12 text-center"
        variants={blockVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={1}
      >
      <HeroCarousel
       
        // bgColor="#f0ede8"
        bgColor="rgb(240, 232, 229)"
        height={1000}
        width="100%"
      />
      </motion.div>
      {/* ........ */}
      
      <ServicesComponent />

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
