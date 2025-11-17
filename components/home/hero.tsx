"use client";

import { Button } from "@/components/ui/button"; 
import type { FC } from "react";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LocationPopup from "./location-popup";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gambianCities = [
  "Banjul", "Serekunda", "Brikama", "Bakau", "Lamin", "Sukuta",
  "Fajara", "Brufut", "Gunjur", "Kotu", "Kololi", "Yundum"
];

const Hero: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCities = gambianCities.filter(city =>
    city.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#0e0b1d] text-white overflow-hidden flex flex-col items-center justify-center py-32">
      
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/images/world-map-dark.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35,
          filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
          transition: 'all 0.5s ease-in-out'
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            The shortest route to your next home
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl"
          >
            One platform, all the rental listings in the Gambia.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-2xl relative">

          <div className="flex items-stretch rounded-lg shadow-2xl bg-[#1A1625] border border-[#2a2438] relative overflow-visible">

            <div className="relative flex-1 overflow-visible" ref={dropdownRef}>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search your city"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full h-full px-6 py-4 text-base text-gray-200 placeholder-gray-400 bg-transparent border-none focus:outline-none"
                />

                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 
                               bg-[#1E1A2E] text-gray-200
                               rounded-lg shadow-2xl max-h-64 overflow-y-auto 
                               z-[999] border border-[#2a2438]"
                  >
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <button
                          key={city}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchValue(city);
                            setShowDropdown(false);
                          }}
                          className="w-full px-6 py-3 text-left text-gray-200 
                                     hover:bg-[#2a2438] transition-colors 
                                     border-b border-[#2a2438] last:border-b-0"
                        >
                          {city}
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-3 text-gray-400 text-sm">No cities found</div>
                    )}
                  </motion.div>
                )}
              </div>

              <Button
                size="lg"
                onClick={() => setShowDropdown(false)}
                className="bg-[#FF5A33] hover:bg-[#e64d28] text-white font-semibold px-8 py-4 text-base border-none h-auto whitespace-nowrap"
              >
                Search for my home
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <LocationPopup />
      </div>
    </section>
  );
};

export default Hero;