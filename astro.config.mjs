import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.cclin.org",
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
    // shikiConfig: {
    //   themes: {
    //     light: "min-light",
    //     dark: "min-dark",
    //   },
    //   wrap: true,
    // },
  },
});
