"use client";

import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

interface City {
  name: string;
  image: string;
}

const citiesData: City[] = [
  { name: "Kololi", image: "/assets/images/cities/kololi.avif" },
  { name: "Brusubi", image: "/assets/images/cities/brusubi.webp" },
  { name: "Kerr Serign", image: "/assets/images/cities/kerr-serign.webp" },
  { name: "Manjai", image: "/assets/images/cities/manjai.webp" },
  { name: "Kotu", image: "/assets/images/cities/kuto.webp" },
  { name: "Bijilo", image: "/assets/images/cities/bijilo.avif" },  
];

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

const DotButton: FC<DotButtonProps> = ({ selected, onClick }) => (
  <button
    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
      selected ? "bg-white scale-125" : "bg-slate-500"
    }`}
    type="button"
    onClick={onClick}
    aria-label="Go to slide"
  />
);

const PopularCities: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative bg-[#031136] text-white py-20 md:py-28 overflow-hidden"
    >
      {/* --- Decorative Background Lines --- */}
      <div className="absolute top-0 right-0 h-full w-1/3 pointer-events-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 200 400"
        >
          <path
            d="M 200 0 C 100 50, 100 200, 200 400"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div className="absolute top-1/2 right-[15%] h-[1px] w-1/3 bg-white/10"></div>
        <div className="absolute top-[30%] right-[30%] h-[1px] w-1/4 bg-white/10"></div>
      </div>
      
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              POPULAR <span className="font-light">cities</span>
            </h2>
            <p className="mt-2 text-slate-300">
              Discover houses and apartments to rent in our most popular locations.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button onClick={scrollPrev} className="w-12 h-12 rounded-full bg-[#FF4F00] flex items-center justify-center transition-transform hover:scale-110">
              <ChevronLeft className="w-6 h-6"/>
            </button>
            <button onClick={scrollNext} className="w-12 h-12 rounded-full bg-[#FF4F00] flex items-center justify-center transition-transform hover:scale-110">
              <ChevronRight className="w-6 h-6"/>
            </button>
          </div>
        </div>

        {/* --- Carousel --- */}
        <div className="overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex">
            {citiesData.map((city, index) => (
              <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={city.image}
                      alt={`View of ${city.name}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {city.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Pagination Dots --- */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PopularCities;