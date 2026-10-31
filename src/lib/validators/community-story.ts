import { z } from "zod";

export const communityStorySchema = z.object({
  title: z.string().trim().min(5, "Title is required").max(140),
  authorDisplay: z.string().trim().min(2, "Display name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  destinationSlug: z.string().trim().max(120).optional(),
  bodyMd: z
    .string()
    .trim()
    .min(40, "Share a fuller story (at least 40 characters)")
    .max(8000),
});

export type CommunityStoryValues = z.infer<typeof communityStorySchema>;
