"use client";

import { useState } from "react";
import type { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MultiStepStepper from "./multi-step-stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusSquare, Bed, Building, Building2, Home, User, Mail, Lock } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const Step1Location: FC<{ onNext: () => void }> = ({ onNext }) => (
  <div>
    <h2 className="text-3xl font-bold text-center text-[#0A2540]">Find out how many matches we&apos;ll find for you</h2>
    <div className="mt-8 max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input id="city" type="text" placeholder="Amsterdam" defaultValue="Amsterdam" className="pl-10" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="price-min" className="text-sm font-medium text-gray-700">Price min (€)</label>
          <Input id="price-min" type="number" placeholder="40" defaultValue="40" className="mt-1" />
        </div>
        <div className="flex-1">
          <label htmlFor="price-max" className="text-sm font-medium text-gray-700">Price max (€)</label>
          <Input id="price-max" type="number" placeholder="2000" defaultValue="2000" className="mt-1" />
        </div>
      </div>
      <Button onClick={onNext} className="w-full bg-[#FF4F00] hover:bg-[#FF4F00]/90">Next</Button>
      <div className="text-center text-sm text-gray-500 border border-gray-300 rounded-md p-2 flex items-center justify-center gap-2">
        <PlusSquare className="w-4 h-4" />
        Add up to 4 searches after signing up
      </div>
    </div>
  </div>
);

const housingTypes = [{ icon: Bed, label: "Room" }, { icon: Building, label: "Studio" }, { icon: Building2, label: "Apartment" }, { icon: Home, label: "House" }];
const furnishingTypes = ["Furnished", "Unfurnished"];
const amenities = ["Balcony", "Parking", "Garden", "Garage", "Pets Allowed", "Huis Registration"];
const Step2Criteria: FC<{ onBack: () => void, onNext: () => void }> = ({ onBack, onNext }) => {
    // In a real app, this state would be lifted to the parent
    const [selectedHousing, setSelectedHousing] = useState("Room");
    return(
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#0A2540]">Refine Your Perfect Home</h2>
            <p className="text-center text-slate-600 mt-2">Setting more filters helps us get appropriate matches tailored to your specific needs</p>
            <div className="mt-8 border border-gray-200 rounded-xl p-6 md:p-8 space-y-8">
                {/* Housing Type */}
                <div>
                    <h3 className="font-semibold text-center mb-4">Housing type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {housingTypes.map(({ icon: Icon, label }) => (
                            <button key={label} onClick={() => setSelectedHousing(label)} className={clsx("p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors", selectedHousing === label ? "bg-[#0A2540] text-white" : "hover:border-[#0A2540]")}>
                                <Icon className="w-6 h-6"/>
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                 {/* ... Other fields like Furnishing, Min surface, Amenities would go here similarly ... */}
            </div>
            <div className="text-center text-sm text-gray-600 border border-gray-300 rounded-md p-3 mt-6">
                With this search you can expect <span className="font-bold text-pink-600">1 matches</span> per week.
            </div>
            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button onClick={onNext} className="bg-[#FF4F00] hover:bg-[#FF4F00]/90">Next</Button>
            </div>
        </div>
    );
};

const Step3SignUp: FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-[#0A2540] text-white p-6 rounded-t-xl text-center">
            <h2 className="text-2xl font-bold">Receive 1 matches next week directly in your inbox!</h2>
            <p className="text-slate-300 mt-1">Start by creating your account. Receive your first matches today.</p>
        </div>
        <div className="bg-white p-8 rounded-b-xl shadow-lg border border-gray-200">
             <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Your name</label>
                    <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input type="text" placeholder="Enter your name" className="pl-10" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">E-mail</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input type="email" placeholder="your@email.com" className="pl-10" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input type="password" placeholder="Password" className="pl-10" />
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-500">By creating an account, you accept our <Link href="#" className="text-[#FF4F00] underline">terms and conditions</Link></p>
                <div className="flex justify-between items-center pt-4">
                    <Button variant="ghost" onClick={onBack}>&larr; Back</Button>
                    <Button type="submit" className="bg-[#FF4F00] hover:bg-[#FF4F00]/90">Send me all matches &rarr;</Button>
                </div>
             </form>
        </div>
    </div>
);


const MultiStepSearchForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps: { [key: number]: ReactNode } = {
    1: <Step1Location onNext={handleNext} />,
    2: <Step2Criteria onBack={handleBack} onNext={handleNext} />,
    3: <Step3SignUp onBack={handleBack} />,
  };

  return (
    <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
            <MultiStepStepper currentStep={currentStep} />
            <div className="mt-12 min-h-[450px]">
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
            </div>
        </div>
    </div>
  );
};

export default MultiStepSearchForm;