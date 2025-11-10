"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Ruler } from "lucide-react";
import { Property } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      favorites = favorites.filter((id: string) => id !== property.id);
    } else {
      favorites.push(property.id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      className="relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 cursor-pointer"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-video w-full bg-gray-100">
        <Image
          src={property.image}
          alt={property.address}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
          priority={false} 
        />
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
          {property.timeAgo}
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 z-10"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              toggleFavorite();
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
            />
          </Button>
        </motion.div>
      </div>

      <div className="p-4 space-y-2">
        <span className="text-xs text-gray-500 font-medium uppercase">{property.type}</span>
        <h3 className="text-xl font-bold text-gray-900">
          GMD {property.price.toLocaleString()}{" "}
          <span className="text-base font-normal text-gray-600">/month</span>
        </h3>
        <p className="text-sm text-gray-700 flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-indigo-500 flex-shrink-0" />
          {property.address}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-700 pt-1">
          <span className="flex items-center gap-1">
            <Ruler className="h-4 w-4 text-gray-500" /> {property.size} m&sup2;
          </span>
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-gray-500" /> {property.beds}
          </span>
          {/* Assuming bathrooms are part of size/beds count, or add if needed */}
          {/* <span className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-gray-500" /> {property.bathrooms}
          </span> */}
        </div>
        <p className="text-xs text-gray-500 mt-2">Available from: {property.availableFrom}</p>
      </div>
    </motion.div>
  );
};

export default PropertyCard;