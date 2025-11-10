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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, DollarSign, Save, BadgeCheck, Filter } from "lucide-react";
import { SearchSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";
import { cities } from "@/lib/data";

interface SearchBarProps {
  savedFiltersCount: number;
  onOpenFilters: () => void;
}

const SearchBar = ({ savedFiltersCount, onOpenFilters }: SearchBarProps) => {
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
    console.log("Search values:", values);
  }

  const priceOptions = [
    { label: "Any Price", value: "any" },
    { label: "GMD 5,000", value: "5000" },
    { label: "GMD 10,000", value: "10000" },
    { label: "GMD 15,000", value: "15000" },
    { label: "GMD 20,000", value: "20000" },
    { label: "GMD 30,000", value: "30000" },
    { label: "GMD 50,000", value: "50000" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-3 md:gap-4 w-full justify-between"
      >
        {/* Municipality */}
        <FormField
          control={form.control}
          name="municipality"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[150px]">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-100 border-gray-200">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
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

        {/* Price Range */}
        <div className="hidden md:flex gap-3 flex-1">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-100 border-gray-200">
                      <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Min Price" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-100 border-gray-200">
                      <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Max Price" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Saved Filters Badge */}
        <Button
          variant="ghost"
          className="hidden md:flex items-center gap-1.5 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <BadgeCheck className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-medium">Saved filters</span>
          {savedFiltersCount > 0 && (
            <Badge className="bg-orange-100 text-orange-600 rounded-full">
              {savedFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Mobile Filter */}
        <Button
          type="button"
          onClick={onOpenFilters}
          className="md:hidden flex-1 bg-gray-100 text-gray-700 border border-gray-200"
        >
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>

        {/* Submit */}
        <Button
          type="submit"
          className="hidden md:flex items-center gap-2 bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          <Save className="h-4 w-4" />
          Save Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
