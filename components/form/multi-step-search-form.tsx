"use client";

import { useState } from "react";
import type { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

import MultiStepStepper from "./multi-step-stepper";
import Step1Location from "../form/multi-step-form/steps/step-one-location";
import Step2Criteria from "../form/multi-step-form/steps/step-two-criteria";
import Step3SignUp from "../form/multi-step-form/steps/step-three-signup";

// Define the shape and validation rules for the entire form
const formSchema = z.object({
  // Step 1
  city: z.string().min(1, { message: "Please select a city." }),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  // Step 2
  housingTypes: z.array(z.string()).min(1, { message: "Please select at least one housing type." }),
  furnishing: z.array(z.string()),
  minSurface: z.coerce.number().optional(),
  rooms: z.array(z.string()),
  bedrooms: z.array(z.string()),
  amenities: z.array(z.string()),
  // Step 3
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export type FormValues = {
  city: string;
  priceMin?: number;
  priceMax?: number;
  housingTypes: string[];
  furnishing: string[];
  minSurface?: number;
  rooms: string[];
  bedrooms: string[];
  amenities: string[];
  name: string;
  email: string;
  password: string;
};

const MultiStepSearchForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const form = useForm<FormValues, undefined, FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      city: "",
      priceMin: undefined,
      priceMax: undefined,
      housingTypes: [],
      furnishing: [],
      minSurface: undefined,
      rooms: [],
      bedrooms: [],
      amenities: [],
      name: "",
      email: "",
      password: "",
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 1) fieldsToValidate = ["city"];
    if (currentStep === 2) fieldsToValidate = ["housingTypes"];
    // Step 3 validation is handled by the final submit button

    const isStepValid = await form.trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted!", data);
    // Here you would typically make an API call
    // On success, navigate to the plan page
    router.push("/plan");
  };

  const steps: { [key: number]: ReactNode } = {
    1: <Step1Location form={form} onNext={handleNext} />,
    2: <Step2Criteria form={form} onBack={handleBack} onNext={handleNext} />,
    3: <Step3SignUp form={form} onBack={handleBack} />,
  };

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <MultiStepStepper currentStep={currentStep} />
        <div className="mt-12 min-h-[550px]">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {steps[currentStep]}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepSearchForm;