"use client";

import type { FC, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { Bot, BellRing, HatGlasses } from "lucide-react";
import FeatureBlob from "@/components/ui/feature-bold"; 

interface Feature {
  icon: FC<{ className?: string }>;
  title: string;
  description: ReactNode;
}

const featuresData: Feature[] = [
  {
    icon: Bot,
    title: "Automate your rental search",
    description: "Search across 100+ rental sites in one platform with instant updates, so you can be the first to apply and secure your home.",
  },
  {
    icon: BellRing,
    title: "Get instant Alerts",
    description: "Get real-time alerts so you never miss your chance to secure your spot. With instant alerts.",
  },
  {
    icon: HatGlasses,
    title: "Active Scam Protection",
    description: (
      <>
        Say goodbye to fake listings and scams thanks to{" "}
        <span className="text-pink-500 font-medium">RentHunter Active Scam Protection</span>
      </>
    ),
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Features: FC = () => {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 md:py-28 bg-white"
    >
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl">
        {/* --- Heading Area --- */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-lg md:text-xl text-slate-500">
            Finding a home is hard,
          </p>
          <h2 className="mt-1 text-4xl md:text-5xl font-bold text-[#0A2540]">
            RentHunter solves it
          </h2>
        </motion.div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                  <FeatureBlob
                    index={index}
                    className="absolute w-full h-full text-slate-100"
                  />
                  <Icon className="relative w-12 h-12 text-[#0A2540]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-slate-600 max-w-xs">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;