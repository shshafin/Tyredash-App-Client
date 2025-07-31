import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  phone: z.string({
    required_error: "Phone number is required",
  }),
  addressLine1: z.string({
    required_error: "Address line 1 is required",
  }),
  addressLine2: z.string().optional(),
  zipCode: z.string({
    required_error: "Zip code is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  state: z.string({
    required_error: "State is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});
