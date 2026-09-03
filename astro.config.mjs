import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig, svgoOptimizer } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { defaultLocale, locales } from "./src/i18n/config.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://cclin.org",
  server: {
    host: true,
  },
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
    processor: unified({
      syntaxHighlight: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: "htmlAndMathml" }]],
    }),
  },
  image: {
    responsiveImages: true,
    remotePatterns: [{ protocol: "https" }],
    layout: "constrained",
    dangerouslyProcessSVG: true,
  },
  i18n: {
    locales,
    defaultLocale,
  },
  experimental: {
    chromeDevtoolsWorkspace: true,
    svgOptimizer: svgoOptimizer(),
  },
});
