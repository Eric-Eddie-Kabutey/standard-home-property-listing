"use client";

import { FC, ComponentType, SVGProps } from "react";
import { UseFormReturn, ControllerRenderProps, Path } from "react-hook-form";
import { FormValues } from "../../multi-step-search-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import clsx from "clsx";
import { Bed, Building, Building2, Home } from "lucide-react";

// Reusable component for toggle buttons
type MultiOption = string | { icon?: ComponentType<SVGProps<SVGSVGElement>>; label: string };

const MultiSelectGroup: FC<{
  options: MultiOption[];
  value: string[];
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
    {options.map((option) => {
      const label = typeof option === "string" ? option : option.label;
      const Icon = typeof option === "string" ? undefined : option.icon;
      return (
        <button
          key={label}
          type="button"
          onClick={() => onChange(label)}
          className={clsx(
            "p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors",
            value.includes(label)
              ? "bg-[#0A2540] text-white border-[#0A2540]"
              : "hover:border-[#0A2540]"
          )}
        >
          {Icon && <Icon className="w-6 h-6" />}
          <span>{label}</span>
        </button>
      );
    })}
  </div>
);

const housingTypes = [{ icon: Bed, label: "Room" }, { icon: Building, label: "Studio" }, { icon: Building2, label: "Apartment" }, { icon: Home, label: "House" }];
const furnishingTypes = ["Furnished", "Unfurnished"];
const rooms = ["1+ rooms", "2+ rooms", "3+ rooms", "4+ rooms"];
const bedrooms = ["1+ bedrooms", "2+ bedrooms", "3+ bedrooms", "4+ bedrooms"];
const amenities = ["Balcony", "Parking", "Garden", "Garage", "Pets Allowed", "Has Registration"];

interface Step2Props {
  form: UseFormReturn<FormValues>;
  onBack: () => void;
  onNext: () => void;
}

const Step2Criteria: FC<Step2Props> = ({ form, onBack, onNext }) => {
  const handleMultiSelect = (field: ControllerRenderProps<FormValues, Path<FormValues>>, option: string) => {
    const currentValues: string[] = Array.isArray(field.value)
      ? field.value
      : typeof field.value === "string"
        ? [field.value]
        : typeof field.value === "number"
          ? [field.value.toString()]
          : [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((item: string) => item !== option)
      : [...currentValues, option];
    field.onChange(newValues);
  };

  return (
    <Form {...form}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#0A2540]">Refine Your Perfect Home</h2>
        <div className="mt-8 border border-gray-200 rounded-xl p-6 md:p-8 space-y-8">
            <FormField control={form.control} name="housingTypes" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-center block mb-4">Housing type</FormLabel>
                    <MultiSelectGroup options={housingTypes} value={field.value} onChange={(option) => handleMultiSelect(field, option)} />
                    <FormMessage className="text-center pt-2" />
                </FormItem>
            )}/>
             <FormField control={form.control} name="furnishing" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-center block mb-4">Furnishing</FormLabel>
                    <MultiSelectGroup options={furnishingTypes} value={field.value} onChange={(option) => handleMultiSelect(field, option)} />
                </FormItem>
            )}/>
            <FormField control={form.control} name="minSurface" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-center block mb-4">Min surface (m²)</FormLabel>
                    <FormControl><Input type="number" placeholder="35" {...field} /></FormControl>
                </FormItem>
            )}/>
            <FormField control={form.control} name="rooms" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-center block mb-4">Rooms</FormLabel>
                    <MultiSelectGroup options={rooms} value={field.value} onChange={(option) => handleMultiSelect(field, option)} />
                </FormItem>
            )}/>
             <FormField control={form.control} name="bedrooms" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-center block mb-4">Bedrooms</FormLabel>
                    <MultiSelectGroup options={bedrooms} value={field.value} onChange={(option) => handleMultiSelect(field, option)} />
                </FormItem>
            )}/>
            <FormField control={form.control} name="amenities" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-center block mb-4">Amenities</FormLabel>
                    <MultiSelectGroup options={amenities} value={field.value} onChange={(option) => handleMultiSelect(field, option)} />
                </FormItem>
            )}/>
        </div>
        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="button" onClick={onNext} className="bg-[#FF4F00] hover:bg-[#FF4F00]/90">Next</Button>
        </div>
      </div>
    </Form>
  );
};

export default Step2Criteria;