"use client";

import type { FC } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageItemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const SolutionHero: FC = () => {
  return (
    <section className="relative w-full bg-[#031136] text-white pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* --- Subtle Background Gradient Glow --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-700/50 via-[#0A2540]/50 to-[#0A2540] -z-0" />
      
      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto flex flex-col items-center text-center"
        >
          {/* Text Content */}
          <motion.h1
            variants={textItemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Ultimate stress-free home hunting
          </motion.h1>

          <motion.p
            variants={textItemVariants}
            className="mt-4 max-w-2xl text-lg md:text-xl text-slate-300"
          >
            Your dream apartment is just a click away, start searching now !
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={textItemVariants}
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 px-8 py-3 rounded-md text-base transition-transform hover:scale-105"
            >
              Learn more
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white px-8 py-3 rounded-md text-base transition-transform hover:scale-105"
            >
              Pricing
            </Button>
          </motion.div>

          {/* Product Screenshot */}
          <motion.div
            variants={imageItemVariants}
            className="mt-16 w-full max-w-5xl"
          >
            <div className="relative w-full aspect-[16/10] bg-slate-800/50 rounded-xl shadow-2xl border border-slate-700 p-2">
               <Image
                src="/assets/images/our-solution-hero.avif"
                alt="RentHunter application interface"
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default SolutionHero;