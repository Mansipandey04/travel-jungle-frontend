import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
  sourceType: z.enum(["trip", "destination", "hidden_india", "general"]),
  sourceId: z.string().optional(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
