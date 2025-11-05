"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import MultiStepStepper from "./multi-step-stepper";
import Step1Location from "./multi-step-form/steps/step-one-location";
import Step2Criteria from "./multi-step-form/steps/step-two-criteria";
import Step3Summary from "./multi-step-form/steps/step-three-signup";
import { formSchema, FormValues } from "@/lib/searchSchema";

const MultiStepSearchForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      city: "",
      priceMin: 0,
      priceMax: 5000,
      housingTypes: [],
      furnishing: [],
      // minSurface: undefined,
      rooms: [],
      bedrooms: [],
      amenities: [],
      name: "",
      email: "",
      password: "",
    },
  });

const handleNext = async () => {
  const fields = currentStep === 1 ? ["city"] : currentStep === 2 ? ["housingTypes"] : [];
  const valid = await form.trigger(fields as (keyof FormValues)[]);
  if (valid) setCurrentStep((s) => s + 1);
};

  const handleBack = () => setCurrentStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <MultiStepStepper currentStep={currentStep} />
        <div className="mt-16">
          <form onSubmit={form.handleSubmit(() => {})}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {currentStep === 1 && <Step1Location form={form} onNext={handleNext} />}
                {currentStep === 2 && <Step2Criteria form={form} onBack={handleBack} onNext={handleNext} />}
                {currentStep === 3 && <Step3Summary form={form} onBack={handleBack} />}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepSearchForm;