import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.cclin.org",
  prefetch: true,
  integrations: [
    expressiveCode({ defaultProps: { wrap: true } }),
    mdx(),
    sitemap(),
    UnoCSS({ injectReset: true }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: "htmlAndMathml" }]],
  },
  redirects: {
    "/[...id]": "/posts/[...id]",
  },
});
