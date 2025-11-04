"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../../multi-step-search-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

/**
 * Fallback Combobox component implemented inline to avoid the missing-module error.
 * This uses a native <datalist> for simplicity; replace with your design-system combobox when available.
 */
type Option = { value: string; label: string };

interface ComboboxProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundMessage?: string;
}

const Combobox: React.FC<ComboboxProps> = ({ options, value = "", onChange, placeholder }) => {
  const listId = "combobox-options";
  return (
    <div>
      <input
        list={listId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </datalist>
    </div>
  );
};

const cities = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "breda", label: "Breda" },
  { value: "delft", label: "Delft" },
  { value: "eindhoven", label: "Eindhoven" },
  { value: "enschede", label: "Enschede" },
];

interface Step1Props {
  form: UseFormReturn<FormValues>;
  onNext: () => void;
}

const Step1Location: FC<Step1Props> = ({ form, onNext }) => {
  return (
    <Form {...form}>
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#0A2540]">Find out how many matches we&apos;ll find for you</h2>
        <div className="mt-8 space-y-6 text-left">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <Combobox
                  options={cities}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a city..."
                  searchPlaceholder="Search city..."
                  notFoundMessage="No city found."
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField control={form.control} name="priceMin" render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price min (€)</FormLabel>
                <FormControl><Input type="number" placeholder="40" {...field} /></FormControl>
              </FormItem>
            )}/>
            <FormField control={form.control} name="priceMax" render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price max (€)</FormLabel>
                <FormControl><Input type="number" placeholder="2000" {...field} /></FormControl>
              </FormItem>
            )}/>
          </div>
          <Button type="button" onClick={onNext} className="w-full bg-[#FF4F00] hover:bg-[#FF4F00]/90">Next</Button>
        </div>
      </div>
    </Form>
  );
};

export default Step1Location;