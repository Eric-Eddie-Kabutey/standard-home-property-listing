
import { z } from "zod";

export const formSchema = z.object({
  city: z.string().min(1, "Please select a city."),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  housingTypes: z.array(z.string()).min(1, "Select at least one housing type."),
  furnishing: z.array(z.string()),
  minSurface: z.number().optional(),
  rooms: z.array(z.string()),
  bedrooms: z.array(z.string()),
  amenities: z.array(z.string()),
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type FormValues = z.infer<typeof formSchema>;