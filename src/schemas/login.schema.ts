import { z } from "zod";

const loginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(8, "Password needs to be at least 8 characters"),
});

export default loginValidationSchema;
