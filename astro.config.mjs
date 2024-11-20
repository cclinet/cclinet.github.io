import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.cclin.org",
  integrations: [mdx(), sitemap(), UnoCSS({ injectReset: true })],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // grid: false,
          theme: "min-light",
          transformers: [
            transformerCopyButton({
              visibility: "always",
              feedbackDuration: 3_000,
            }),
          ],
        },
      ],
      [rehypeKatex, { output: "htmlAndMathml" }],
    ],
  },
});
