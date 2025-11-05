"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/searchSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { MapPin } from "lucide-react";

const cities = [
  { value: "banjul", label: "Banjul" },
  { value: "serekunda", label: "Serekunda" },
  { value: "brikama", label: "Brikama" },
  { value: "bakau", label: "Bakau" },
  { value: "brusubi", label: "Brusubi" },
  { value: "farafenni", label: "Farafenni" },
  { value: "sukuta", label: "Sukuta" },
  { value: "basse-santa-su", label: "Basse Santa Su" },
  { value: "bundo", label: "Bundo" },
  { value: "kuntaur", label: "Kuntaur" },
];

interface Step1Props {
  form: UseFormReturn<FormValues>;
  onNext: () => void;
}

const Step1Location: FC<Step1Props> = ({ form, onNext }) => {
  const priceMin = form.watch("priceMin") ?? 5000;
  const priceMax = form.watch("priceMax") ?? 500000;

  return (
    <Form {...form}>
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900">Find out how many matches we’ll find for you</h2>

        <div className="mt-10 space-y-8 text-left">
          {/* City Select */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-5 w-5  text-indigo-600" />
                  City
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-indigo-600 focus:ring-indigo-600"
                  >
                    <option value="">Select a city...</option>
                    {cities.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Range in Dalasi */}
          <div>
            <FormLabel className="mb-4 block text-lg font-medium">Price Range (D)</FormLabel>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>D{priceMin.toLocaleString()}</span>
                <span>D{priceMax.toLocaleString()}</span>
              </div>

              {/* Min Price Slider */}
              <FormField
                control={form.control}
                name="priceMin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slider
                        min={5000}
                        max={500000}
                        step={5000}
                        value={[field.value ?? 5000]}
                        onValueChange={(v) => field.onChange(v[0])}
                        className="[&_[role=slider]]:bg-indigo-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Max Price Slider */}
              <FormField
                control={form.control}
                name="priceMax"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slider
                        min={5000}
                        max={500000}
                        step={5000}
                        value={[field.value ?? 500000]}
                        onValueChange={(v) => field.onChange(v[0])}
                        className="[&_[role=slider]]:bg-orange-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Next Button */}
          <Button
            type="button"
            onClick={onNext}
            className="mt-8 w-full bg-orange-500 py-7 text-lg font-semibold text-white hover:bg-orange-600 hover:scale-105 transition-all"
          >
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Step1Location;