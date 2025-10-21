"use client";

import type { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HowItWorks: FC = () => {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* --- Blurred Background Image --- */}
      <Image
        src="/blurry-background.jpg" 
        alt="Blurred background"
        fill
        className="object-cover -z-10 opacity-80"
      />

      <div className="container mx-auto px-4">
        {/* --- Optional Heading (Good for SEO and context) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]">
            See It In Action
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Experience how RentHunter simplifies your search from start to finish.
          </p>
        </motion.div>

        {/* --- Video Player Container --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto bg-white/50 backdrop-blur-sm p-3 md:p-4 rounded-2xl shadow-2xl border border-gray-200"
        >
          <div className="relative w-full aspect-video overflow-hidden rounded-lg">
            <video
              className="w-full h-full object-cover"
              src="https://www.youtube.com/watch?v=OHjEkG7HAyg&pp=ygUcaG91c2luZyBkdWJpYXlvdXR1YmUgY2hhbm5lbA%3D%3D" 
              poster="/assets/images/cover-photo.avif" 
              controls
              loop
              muted
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;