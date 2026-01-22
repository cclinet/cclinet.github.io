import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { ALLOWED_TAGS } from "./consts";


const blog = defineCollection({
  // Load data from Markdown files on disk
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    isChinaIllegal: z.boolean().optional(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.enum(ALLOWED_TAGS)).optional(),
  }),
});
const mathCollection = defineCollection({
  // Load data from Markdown files on disk
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/math" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog, mathCollection };
