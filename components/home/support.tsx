"use client";

import type { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const avatarImages = [
  "/assets/images/support/agent-1.avif",
  "/assets/images/support/agent-2.avif",
  "/assets/images/support/agent-3.avif",
  "/assets/images/support/agent-4.avif",
];

const Support: FC = () => {
  return (
    <div className="py-20 md:py-28">
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-50 rounded-2xl p-8 md:p-10 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
            
            {/* Left Side: Text */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540]">
                NEED HELP ?
              </h2>
              <p className="mt-2 text-slate-600">
                Our customer service is available every day from 10:00 – 16:00
              </p>
            </div>

            {/* Middle: Overlapping Avatars */}
            <div className="flex -space-x-4 flex-shrink-0">
              {avatarImages.map((src, index) => (
                <div key={index} className="relative">
                  <Image
                    src={src}
                    alt={`Support agent ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-4 border-slate-50"
                  />
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-50" />
                </div>
              ))}
            </div>

            {/* Right Side: Button */}
            <div className="flex-shrink-0">
              <Button
                size="lg"
                className="bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 px-6 py-6 text-base rounded-md transition-transform hover:scale-105"
              >
                Have questions? Get help
              </Button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;