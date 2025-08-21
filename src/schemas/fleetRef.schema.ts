import { z } from "zod";

export const fleetRefSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  note: z.string().max(200, "Note cannot exceed 200 characters").optional(),
});

export type FleetRefFormData = z.infer<typeof fleetRefSchema>;
