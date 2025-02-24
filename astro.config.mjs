import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  site: "https://cclin.org",
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    expressiveCode({
      defaultProps: { wrap: true },
      themes: ["catppuccin-latte"],
      emitExternalStylesheet: true,
      plugins: [pluginLineNumbers()],
    }),
    mdx(),
    sitemap(),
  ],

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: "htmlAndMathml" }]],
  },
  i18n: {
    locales: ["zh", "en"],
    defaultLocale: "zh",
  },
  experimental: {
    svg: true,
  },
});
