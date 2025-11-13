"use client";

import { motion } from "framer-motion";
import type { FC } from "react";

interface LocationPopupProps {
  className?: string; 
}

const LocationPopup: FC<LocationPopupProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
      className={`mt-16 relative ${className}`}
    >
      <div className="relative bg-white text-gray-900 rounded-lg shadow-xl px-5 py-3 flex items-center gap-3">
        <span role="img" aria-label="Flag of The Gambia" className="text-2xl">
          🇬🇲
        </span>
        <span className="font-semibold text-base">Gambia</span>
        
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white" />
      </div>
    </motion.div>
  );
};

export default LocationPopup;