"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { FC } from "react";
import { motion, Variants } from "framer-motion";
import LocationPopup from "./location-popup";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero: FC = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-[160vh] 2xl:h-[110vh]  bg-black text-white outline overflow-hidden">
      {/* Background Swirls */}
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="hidden md:block absolute -top-1/4 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] md:w-[100vw] md:h-[95vw] 2xl:h-[90vh] pointer-events-none"
      >
        <Image src="/background-swirl.svg" alt="background swirl" fill className="opacity-40" />
      </motion.div>

      {/* Globe Background Image */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[60vh] md:h-[80vh] max-w-[1400px] z-10 pointer-events-none"
      >
        <Image
          src="/assets/image/globe.png"
          alt="SVG Background"
          fill
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* Globe Animated Arcs Layer */}
      <div className="absolute -bottom-42 md:-bottom-15 2xl:-bottom-35 left-1/2 -translate-x-1/2 w-full h-[60vh] md:h-[80vh] 2xl:-w-full container mx-auto lg:max-w-5xl xl:max-w-6xl z-15 pointer-events-none">
              {/* <GlobeArcs /> */}
              <Image src='/assets/images/globe.png' alt="Globe Illustration" fill className="object-contain" priority />
      </div>

      <LocationPopup className="bottom-0 md:bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center z-20 pt-36 md:pt-44 2xl:pt-52">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 flex flex-col items-center text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-snug"
          >
            Turning Ideas Into World
            <br />
            Changing Solutions
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-lg md:text-xl text-gray-300"
          >
            We connect visionaries, innovators, and entrepreneurs with the tools, mentors, and
            opportunities they need to make an impact.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-green-500 text-black border-green-400 font-semibold hover:bg-green-600 px-8 py-6 text-base transition-transform hover:scale-105"
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-gray-100 text-black border-gray-100 hover:bg-gray-200 px-8 py-6 text-base font-semibold transition-transform hover:scale-105"
            >
              Explore Our Programs
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;