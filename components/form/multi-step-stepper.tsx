"use client";

import { FC } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const steps = [
  { id: 1, name: "Location" },
  { id: 2, name: "Criteria" },
  { id: 3, name: "Let's go!" },
];

interface MultiStepStepperProps {
  currentStep: number;
}

const MultiStepStepper: FC<MultiStepStepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="flex items-center justify-center">
      <ol className="flex items-center space-x-8 md:space-x-16">
        {steps.map((step, idx) => (
          <li key={step.id} className="relative flex items-center">
            <motion.div
              layout
              className={clsx(
                "flex h-12 w-12 items-center justify-center rounded-full border-4 text-lg font-bold transition-all",
                currentStep > step.id
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : currentStep === step.id
                  ? "border-indigo-600 bg-white text-indigo-600"
                  : "border-gray-300 bg-white text-gray-400"
              )}
            >
              {currentStep > step.id ? (
                <Check className="h-6 w-6" />
              ) : (
                step.id
              )}
            </motion.div>

            <span
              className={clsx(
                "ml-3 text-lg font-medium hidden md:block",
                currentStep >= step.id ? "text-indigo-600" : "text-gray-400"
              )}
            >
              {step.name}
            </span>

            {idx < steps.length - 1 && (
              <div className="absolute top-6 left-12 -ml-px h-0.5 w-full md:w-16 bg-gray-300">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scale: currentStep > step.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default MultiStepStepper;