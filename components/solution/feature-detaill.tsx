"use client";

import type { FC, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import FeatureBlobBackground from "./feature-blob-background";

interface FeatureDetailProps {
  title: string;
  description: ReactNode;
  visualElement: ReactNode;
  imageSide: 'left' | 'right';
}

const FeatureDetailSection: FC<FeatureDetailProps> = ({ title, description, visualElement, imageSide }) => {
  
  const textVariants: Variants = {
    hidden: { opacity: 0, x: imageSide === 'left' ? 30 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  const imageVariants: Variants = {
    hidden: { opacity: 0, x: imageSide === 'left' ? -30 : 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
      className="py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            imageSide === 'left' ? 'lg:grid-flow-col-dense' : ''
          }`}
        >
          {/* --- Text Column --- */}
          <motion.div
            variants={textVariants}
            className={`flex flex-col gap-4 ${
              imageSide === 'left' ? 'lg:col-start-2' : ''
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              {title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* --- Visual Column --- */}
          <motion.div
            variants={imageVariants}
            className={`relative min-h-[300px] md:min-h-[450px] ${
              imageSide === 'left' ? 'lg:col-start-1' : ''
            }`}
          >
            <FeatureBlobBackground className="absolute inset-0 w-full h-full text-blue-100 -z-10" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {visualElement}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeatureDetailSection;