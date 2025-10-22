"use client";

import { motion } from "framer-motion";
import type { FC } from "react";

interface LocationPopupProps {
  // Pass Tailwind positioning classes like 'top-10 left-20'
  className?: string; 
}

const LocationPopup: FC<LocationPopupProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      // This is an ABSOLUTE container. You position it via the className prop.
      className={`absolute z-70 ${className}`}
    >
      <div
        className={`
          relative flex items-center gap-3
          px-4 py-2
          bg-slate-50 text-slate-900
          rounded-xl shadow-lg
          font-bold text-lg
          
          /* This creates the little triangle pointer at the top */
          before:content-['']
          before:absolute
          before:w-3 before:h-3
          before:bg-slate-50
          before:rotate-45
          before:-top-[6px] /* Position it just above the top edge */
          before:left-1/2 before:-translate-x-1/2
        `}
      >
        <span role="img" aria-label="Flag of The Gambia">
          🇬🇲
        </span>
        <span>Gambia</span>
      </div>
    </motion.div>
  );
};

export default LocationPopup;