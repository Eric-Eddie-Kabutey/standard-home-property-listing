"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter, SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/rent/property-card";
import SearchBar from "@/components/rent/search-bar";
import PropertyMap from "@/components/rent/property-map";
import FiltersSheet from "@/components/rent/filters-sheet";
import { properties } from "@/lib/data";
import { useMediaQuery } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "size-asc"
  | "size-desc";

const RentPage = () => {
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState(false);
  const [savedFiltersCount] = useState(3);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const filteredAndSortedProperties = useMemo(() => {
    const currentProperties = [...properties];

    switch (sortOption) {
      case "price-asc":
        currentProperties.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        currentProperties.sort((a, b) => b.price - a.price);
        break;
      case "size-asc":
        currentProperties.sort((a, b) => a.size - b.size);
        break;
      case "size-desc":
        currentProperties.sort((a, b) => b.size - a.size);
        break;
      case "newest":
      default:
        break;
    }
    return currentProperties;
  }, [sortOption]);

  const totalOffers = properties.length;
  const displayedOffers = filteredAndSortedProperties.length;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-gray-50">
      {/* Top Search Bar */}
      <div className="sticky top-[5rem] z-40 bg-white shadow-sm py-3 px-4 md:px-6 border-b border-gray-200">
        <SearchBar
          savedFiltersCount={savedFiltersCount}
          onOpenFilters={() => setIsFiltersSheetOpen(true)}
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row w-full px-2 sm:px-4 md:px-6 gap-6 lg:gap-8">
        {/* Property List */}
        <section className="flex flex-col w-full lg:w-[65%] xl:w-[60%]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {displayedOffers} offers
              </h2>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Total {totalOffers}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 hidden sm:block">
                Sort by:
              </span>
              <Select
                value={sortOption}
                onValueChange={(value: SortOption) => setSortOption(value)}
              >
                <SelectTrigger className="w-[170px] bg-white">
                  <ListFilter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Newest first" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="price-asc">
                    Price (lowest first)
                  </SelectItem>
                  <SelectItem value="price-desc">
                    Price (highest first)
                  </SelectItem>
                  <SelectItem value="size-asc">Size (smallest first)</SelectItem>
                  <SelectItem value="size-desc">Size (largest first)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      className="rounded-lg overflow-hidden shadow-md bg-white animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="h-48 w-full bg-gray-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex space-x-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                : displayedOffers === 0
                ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="col-span-full text-center p-12 text-gray-500 text-lg"
                    >
                      No properties found matching your criteria.
                    </motion.div>
                  )
                : filteredAndSortedProperties.map((property, i) => (
                    <motion.div
                      key={property.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      exit="hidden"
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Map Section (Desktop only) */}
        {isDesktop && (
          <section className="hidden lg:block lg:w-[35%] xl:w-[40%] relative">
            <PropertyMap
              totalOffers={totalOffers}
              currentOffers={displayedOffers}
            />
          </section>
        )}
      </main>

      {/* Mobile Filter Button */}
      {!isDesktop && (
        <>
          <motion.button
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-indigo-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:hidden"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            onClick={() => setIsFiltersSheetOpen(true)}
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-6 w-6" />
          </motion.button>

          <FiltersSheet
            isOpen={isFiltersSheetOpen}
            onOpenChange={setIsFiltersSheetOpen}
          />
        </>
      )}
    </div>
  );
};

export default RentPage;