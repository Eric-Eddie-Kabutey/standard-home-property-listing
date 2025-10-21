"use client";

import type { FC } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // From Shadcn UI

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Founders: FC = () => {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-20 md:py-28 bg-white"
    >
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-6xl font-bold text-[#0A2540] tracking-tight">
              We&apos;ve been there
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
              Finding a home can be stressful. Our founders, expats in the Netherlands,
              faced the same frustrating journey—endless searches, missed
              opportunities, and unreliable listings.
            </p>
            <p className="mt-4 text-lg text-slate-600 max-w-lg leading-relaxed">
              That&apos;s why we created RentHunter, to simplify and speed up the rental
              process for people like you. We understand your needs because we&apos;ve
              been there. RentHunter helps you find the perfect apartment, without the
              stress.
            </p>
            <Button
              size="lg"
              className="mt-8 bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 px-8 py-3 rounded-md text-base transition-transform hover:scale-105"
            >
              About us
            </Button>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div variants={imageVariants} className="relative w-full aspect-[4/3]">
            <Image
              src="/assets/images/founders.webp"
              alt="The founders of RentHunter"
              fill
              className="rounded-2xl object-cover shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default Founders;