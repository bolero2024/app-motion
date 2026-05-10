import { motion } from "framer-motion";
import { useState } from "react";

function SwitchCarousel() {
  const [activeTab, setActiveTab] = useState<"perso" | "pro">("perso");
  return (
    <div>
      <motion.div
        id="shap-box"
        className="absolute z-5 left-1 top-1 w-1/2 h-10 bg-gray-200 rounded-full"
        animate={{ x: activeTab === "pro" ? 152 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
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
      </motion.div>
    </div>
  );
}

export default SwitchCarousel;
