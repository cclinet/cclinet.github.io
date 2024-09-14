import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.cclin.org",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: "htmlAndMathml" }]],
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
});
