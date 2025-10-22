"use client";

import type { FC } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

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
  hidden: { opacity: 0, x: 30, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const AboutUs: FC = () => {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              About Us
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              We are Nicolas, Romain and Fabien 👋 🇫🇷
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We arrived in Amsterdam in August 2023 and like everyone else... we
              struggled... a lot... to find something to rent.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              As engineers, we like to solve problems! <br />
              This crazy market is a real problem...
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              So we have developed bots to help us apply as quickly as possible.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              And it was a game-changer!
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              In 3 days, we had too many viewings and we found a lovely{' '}
              <span className="text-pink-600 font-semibold">
                flat in Amsterdam West!
              </span>
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Since then, we&apos;ve started helping our friends find accommodation.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              And now, 4 months later, we&apos;ve successfully helped dozens of people
              and saved them months of struggle!
            </p>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div variants={imageVariants} className="relative w-full aspect-[4/3]">
            <Image
              src="/assets/images/founders.webp" 
              alt="The founders: Nicolas, Romain, and Fabien"
              fill
              className="rounded-2xl object-cover shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority 
            />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;