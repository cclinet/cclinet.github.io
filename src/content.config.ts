// src/content.config.ts
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load data from Markdown files on disk
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
