import { z } from "zod";

export const favoriteSchema = z.object({
  cca3: z.string().length(3).toUpperCase(),
  note: z.string().max(500).optional()
});

export const noteSchema = z.object({
  content: z.string().min(1).max(2000)
});

export const collectionSchema = z.object({
  name: z.string().min(1).max(80),
  description: z.string().max(300).optional()
});

export const collectionItemSchema = z.object({
  cca3: z.string().length(3).toUpperCase()
});
