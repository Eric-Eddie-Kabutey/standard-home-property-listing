import * as z from "zod";

export const SearchSchema = z.object({
  municipality: z.string().optional(),
  minPrice: z.string().optional(), 
  maxPrice: z.string().optional(),
  propertyType: z.string().optional(),
  beds: z.string().optional(),
});

export type SearchFormValues = z.infer<typeof SearchSchema>;