import { ALLOWED_TAGS, BLOG_SECTIONS, BLOG_SERIES } from "@/config/content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blogSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.enum(ALLOWED_TAGS)).optional(),
    section: z.enum(BLOG_SECTIONS),
    series: z.enum(BLOG_SERIES).optional(),
  })
  .superRefine((post, context) => {
    if (post.series === "quant-trading" && post.section !== "quant") {
      context.addIssue({
        code: "custom",
        path: ["section"],
        message: "The quant-trading series must use the quant section",
      });
    }
  });

const blog = defineCollection({
  // Load data from Markdown files on disk
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: blogSchema,
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
