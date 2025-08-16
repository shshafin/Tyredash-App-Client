import { z } from "zod";

export const fleetNewsValidationSchema = z.object({
  badge: z.string({
    required_error: "Badge is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  status: z.enum(["featured", "recent"]).optional(),
});

export type FleetNewsFormData = z.infer<typeof fleetNewsValidationSchema>;
