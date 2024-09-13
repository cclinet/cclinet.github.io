import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",

  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
