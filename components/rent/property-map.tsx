"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image"; 

interface PropertyMapProps {
  totalOffers: number;
  currentOffers: number;
}

const PropertyMap = ({ totalOffers, currentOffers }: PropertyMapProps) => {
  const mockPins = [
    { id: "p1", top: "55%", left: "30%", city: "Serekunda" },
    { id: "p2", top: "60%", left: "35%", city: "Brikama" },
    { id: "p3", top: "45%", left: "40%", city: "Banjul" },
    { id: "p4", top: "65%", left: "25%", city: "Gunjur" },
    { id: "p5", top: "50%", left: "33%", city: "Kololi" },
    { id: "p6", top: "48%", left: "38%", city: "Bakau" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-[10rem] h-[calc(100vh-13rem)] bg-gray-100 rounded-xl overflow-hidden shadow-md border border-gray-200 flex items-center justify-center relative" // Adjusted top and height
      aria-label="Map displaying property locations"
    >
      <Image
        src="/assets/images/properties/gambia-map-placeholder.png"
        alt="Map of The Gambia with property locations"
        fill
        style={{ objectFit: "cover" }}
        className="grayscale opacity-80"
        priority={false}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-lg z-10"
      >
        {currentOffers} of {totalOffers} homes
      </motion.div>

      {mockPins.map((pin) => (
        <motion.div
          key={pin.id}
          className="absolute z-10 p-1 rounded-full bg-orange-500 ring-2 ring-white shadow-lg cursor-pointer"
          style={{ top: pin.top, left: pin.left }}
          whileHover={{ scale: 1.2, zIndex: 20 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 + Math.random() * 0.3 }}
          aria-label={`Property in ${pin.city}`}
        >
          <MapPin className="h-4 w-4 text-white" />
          <span className="sr-only">{pin.city}</span>
        </motion.div>
      ))}


      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-10">
        <Button
          size="icon"
          className="shadow-md bg-white hover:bg-gray-100 text-gray-700 rounded-full"
          aria-label="Zoom In"
        >
          +
        </Button>
        <Button
          size="icon"
          className="shadow-md bg-white hover:bg-gray-100 text-gray-700 rounded-full"
          aria-label="Zoom Out"
        >
          -
        </Button>
        <Button
          size="icon"
          className="shadow-md bg-white hover:bg-gray-100 text-gray-700 rounded-full"
          aria-label="Recenter map"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyMap;