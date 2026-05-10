// import InputHero from "./InputHero";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HeaderCarousel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const [activeTab, setActiveTab] = useState<"perso" | "pro">("perso");

  return (
    <>
      {/* Hero text */}
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        {/* Switch BTN */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="flex items-center justify-center gap-4 mt-8 h-12 mx-auto relative
                          rounded-full w-72 px-1 bg-white p-2 shadow-lg z-30 backdrop-blur-sm pointer-events-auto"
          >
            {/*  */}
            <motion.div
              id="shap-box"
              className="absolute z-5 left-1 top-1 w-1/2 h-10 bg-gray-200 rounded-full"
              animate={{ x: activeTab === "pro" ? 152 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
            {/*  */}
            <div className="absolute z-20 flex flex-row items-center justify-center gap-4 w-72 h-12 rounded-full">
              <div className="flex-1 w-1/2 flex-row items-center bg-gray-50/10">
                <button
                  type="button"
                  className="rounded-full px-2 py-1 bg-transparent"
                  onClick={() => setActiveTab("perso")}
                  id="perso-btn"
                >
                  <span className="font-medium text-sm">Personnel</span>
                </button>
              </div>
              {/*  */}
              <div className="flex-1 w-1/2 flex-row items-center bg-gray-50/10">
                <button
                  type="button"
                  className="rounded-full px-2 py-1 bg-transparent"
                  onClick={() => setActiveTab("pro")}
                  id="pro-btn"
                >
                  <span className="font-medium text-sm">Professionnel</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        

        {/*  */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(86px, 3.5vw, 46px)",
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.8px",
              lineHeight: 1.8,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: "0.4rem 0 0",
              fontSize: "clamp(32px, 2vw, 32px)",
              fontWeight: 300,
              color: "#222125",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Input animation gradian */}
        <motion.div
          className="flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="gradient-border-dark     w-120 h-16 rounded-full mb-8  ">
            {/* ................... */}
            <div className="flex  flex-row items-center  w-full bg-white rounded-full">
              <div className="flex flex-row w-full items-center justify-start gap-4 px-6 py-4 bg-white rounded-full">
                <img
                  src="../icons/logo_copilote.png"
                  alt="Hero"
                  width={24}
                  height={24}
                />
                <input
                  type="text"
                  placeholder="What will you explore today? "
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                />
              </div>
              {/* .... */}
              <div className="flex flex-row items-center justify-end  ">
                <button
                  className="mx-2"
                  aria-label="Launch Copilot Vision"
                  onClick={() => alert("Copilot Vision Launched!")}
                >
                  <span
                    className=" bg-linear-to-r from-slate-100 to-indigo-100 p-2 rounded-full w-10 h-10 
                  flex items-center justify-center cursor-pointer pointer-events-auto 
                  hover:from-slate-200 hover:to-indigo-200 transition-colors duration-300"
                  >
                    <img
                      src="../icons/sound.svg"
                      alt="Hero"
                      width={18}
                      height={18}
                    />
                  </span>
                </button>

                <button
                  className="mx-2"
                  aria-label="Launch Copilot Vision"
                  onClick={() => alert("Copilot Vision Launched!")}
                >
                  <span
                    className=" bg-linear-to-r from-purple-400 to-indigo-500 p-2 rounded-full w-10 h-10 
                  flex items-center justify-center cursor-pointer pointer-events-auto
                  hover:from-purple-500 hover:to-indigo-600 transition-colors duration-300
                  "
                  >
                    <img
                      src="../icons/arrow-top.svg"
                      alt="Hero"
                      width={24}
                      height={24}
                    />
                  </span>
                </button>
              </div>
              {/* .... */}
            </div>
          </div>
        </motion.div>

        {/* Input Carousel */}
      </div>
    </>
  );
}
