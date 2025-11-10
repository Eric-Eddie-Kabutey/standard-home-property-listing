"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { SearchSchema } from "@/lib/schema";
import { cities } from "@/lib/data";

interface FiltersSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FiltersSheet = ({ isOpen, onOpenChange }: FiltersSheetProps) => {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      municipality: "any",
      minPrice: "any",
      maxPrice: "any",
      propertyType: "any",
      beds: "any",
    },
  });

  function onSubmit(values: z.infer<typeof SearchSchema>) {
    console.log("Mobile filter values:", values);
    onOpenChange(false);
  }

  const propertyTypes = ["Apartment", "House", "Villa", "Land"];
  const bedsOptions = ["Any", "1", "2", "3", "4+"];
  const priceOptions = [
    { label: "Any Price", value: "any" },
    { label: "5,000 GMD", value: "5000" },
    { label: "10,000 GMD", value: "10000" },
    { label: "15,000 GMD", value: "15000" },
    { label: "20,000 GMD", value: "20000" },
    { label: "30,000 GMD", value: "30000" },
    { label: "50,000 GMD", value: "50000" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900">
            Filter Properties
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Adjust your search criteria to find the perfect home.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 py-6"
          >
            {/* Municipality */}
            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select municipality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="any">All municipalities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Property Type */}
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="any">Any Type</SelectItem>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Bedrooms */}
            <FormField
              control={form.control}
              name="beds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bedsOptions.map((num) => (
                        <SelectItem
                          key={num}
                          value={num === "Any" ? "any" : num}
                        >
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Price Range */}
            <FormItem>
              <FormLabel>Price Range (GMD)</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Min Price" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceOptions.map((option) => (
                          <SelectItem
                            key={`min-${option.value}`}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Max Price" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceOptions.map((option) => (
                          <SelectItem
                            key={`max-${option.value}`}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </FormItem>

            <SheetFooter className="mt-8 flex-col sm:flex-row sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="w-full sm:w-auto"
              >
                Reset Filters
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Apply Filters
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersSheet;
