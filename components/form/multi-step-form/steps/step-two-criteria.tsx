"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/searchSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Home, Bed, Building2, Ruler, Users, Leaf, Car, Dog, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface Step2Props {
  form: UseFormReturn<FormValues>;
  onBack: () => void;
  onNext: () => void;
}

const ToggleBadge: FC<{
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}> = ({ label, icon, selected, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 rounded-full border-2 px-5 py-3 font-medium transition-all ${
      selected
        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
      : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400"
    }`}
  >
    {icon}
    {label}
  </motion.button>
);

const Step2Criteria: FC<Step2Props> = ({ form, onBack, onNext }) => {
  // const values = form.watch();
  const matchCount = Math.floor(Math.random() * 25) + 5; // Mock

  return (
    <Form {...form}>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Refine Your Perfect Home</h2>
        <p className="mt-3 text-center text-gray-600">
          Setting more filters helps us get appropriate matches tailored to your specific needs.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-lg space-y-10">
          {/* Housing Type */}
          <FormField
            control={form.control}
            name="housingTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                  <Home className="h-5 w-5" /> Housing Type
                </FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {[
                    { label: "Room", icon: <Bed className="h-5 w-5" /> },
                    { label: "Studio", icon: <Building2 className="h-5 w-5" /> },
                    { label: "Apartment", icon: <Building2 className="h-5 w-5" /> },
                    { label: "House", icon: <Home className="h-5 w-5" /> },
                  ].map((opt) => (
                    <ToggleBadge
                      key={opt.label}
                      label={opt.label}
                      icon={opt.icon}
                      selected={field.value.includes(opt.label)}
                      onClick={() => {
                        const newVal = field.value.includes(opt.label)
                          ? field.value.filter((v) => v !== opt.label)
                          : [...field.value, opt.label];
                        field.onChange(newVal);
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Furnishing */}
          <FormField
            control={form.control}
            name="furnishing"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                  Furnishing
                </FormLabel>
                <div className="flex gap-3 mt-4">
                  {["Furnished", "Unfurnished"].map((opt) => (
                    <ToggleBadge
                      key={opt}
                      label={opt}
                      selected={field.value.includes(opt)}
                      onClick={() => {
                        const newVal = field.value.includes(opt)
                          ? field.value.filter((v) => v !== opt)
                          : [opt];
                        field.onChange(newVal);
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          {/* Min Surface */}
          <FormField
            control={form.control}
            name="minSurface"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                  <Ruler className="h-5 w-5" /> Min Surface (m²)
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-lg border px-4 py-3 text-lg"
                  >
                    <option value="">No minimum</option>
                    {[20, 40, 60, 80, 100].map((v) => (
                      <option key={v} value={v}>
                        {v} m²
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Rooms & Bedrooms */}
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                    <Users className="h-5 w-5" /> Rooms
                  </FormLabel>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {["1+", "2+", "3+", "4+"].map((opt) => (
                      <ToggleBadge
                        key={opt}
                        label={opt}
                        selected={field.value.includes(opt)}
                        onClick={() => {
                          const newVal = field.value.includes(opt)
                            ? field.value.filter((v) => v !== opt)
                            : [...field.value, opt];
                          field.onChange(newVal);
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                    <Bed className="h-5 w-5" /> Bedrooms
                  </FormLabel>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {["1+", "2+", "3+", "4+"].map((opt) => (
                      <ToggleBadge
                        key={opt}
                        label={opt}
                        selected={field.value.includes(opt)}
                        onClick={() => {
                          const newVal = field.value.includes(opt)
                            ? field.value.filter((v) => v !== opt)
                            : [...field.value, opt];
                          field.onChange(newVal);
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Amenities */}
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Amenities</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "Balcony", icon: <Leaf className="h-4 w-4" /> },
                    { label: "Parking", icon: <Car className="h-4 w-4" /> },
                    { label: "Garden", icon: <Leaf className="h-4 w-4" /> },
                    { label: "Garage", icon: <Car className="h-4 w-4" /> },
                    { label: "Pets Allowed", icon: <Dog className="h-4 w-4" /> },
                    { label: "Has Registration", icon: <FileText className="h-4 w-4" /> },
                  ].map((opt) => (
                    <Badge
                      key={opt.label}
                      variant={field.value.includes(opt.label) ? "default" : "outline"}
                      className="cursor-pointer py-3"
                      onClick={() => {
                        const newVal = field.value.includes(opt.label)
                          ? field.value.filter((v) => v !== opt.label)
                          : [...field.value, opt.label];
                        field.onChange(newVal);
                      }}
                    >
                      {opt.icon} {opt.label}
                    </Badge>
                  ))}
                </div>
              </FormItem>
            )}
          />

          {/* Match Counter */}
          <motion.div
            key={matchCount}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-xl bg-gradient-to-r from-purple-50 to-orange-50 p-6 text-center"
          >
            <p className="text-lg font-semibold text-indigo-700">
              With this search you can expect{" "}
              <span className="text-3xl font-bold text-orange-600">{matchCount}</span> matches per week.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack} size="lg">
            Back
          </Button>
          <Button type="button" onClick={onNext} className="bg-orange-500 hover:bg-orange-600" size="lg">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Step2Criteria;