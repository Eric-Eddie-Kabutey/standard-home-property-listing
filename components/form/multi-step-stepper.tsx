"use client";

import type { FC } from "react";
import clsx from "clsx";

const steps = [
  { id: 1, name: "Location" },
  { id: 2, name: "Criteria" },
  { id: 3, name: "Let's go!" },
];

interface StepperProps {
  currentStep: number;
}

const MultiStepStepper: FC<StepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={clsx(
              "relative",
              stepIdx !== steps.length - 1 ? "flex-1" : ""
            )}
          >
            <div className="flex items-center text-sm font-medium">
              <span className={clsx(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2",
                currentStep > step.id ? "border-[#0A2540] bg-[#0A2540]" :
                currentStep === step.id ? "border-[#0A2540]" : "border-gray-300"
              )}>
                <span className={clsx(
                  currentStep > step.id ? "text-white" :
                  currentStep === step.id ? "text-[#0A2540]" : "text-gray-500"
                )}>
                  {step.id}
                </span>
              </span>
              <span className={clsx(
                "ml-4 hidden md:block",
                currentStep >= step.id ? "text-[#0A2540]" : "text-gray-500"
              )}>
                {step.name}
              </span>
            </div>

            {/* Connecting line */}
            {stepIdx !== steps.length - 1 ? (
              <div
                className="absolute top-5 left-12 -ml-px mt-0.5 h-0.5 w-full bg-gray-300"
                aria-hidden="true"
              >
                 <div className={clsx(
                    "h-full bg-[#0A2540] transition-all duration-300",
                    currentStep > step.id ? "w-full" : "w-0"
                 )}/>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default MultiStepStepper;