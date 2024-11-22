import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from "unocss";

import { SocialLinks } from "./src/consts";

const codeCss = {
  "pre, code": {
    overflow: "visible",
    "word-wrap": "break-word",
    "white-space": "pre-wrap",
  },
  pre: {
    padding: "0",
  },
  "code[data-line-numbers]": { "counter-reset": "line" },
  "code[data-line-numbers] > [data-line]::before": {
    "counter-increment": "line",
    content: "counter(line)",
    display: "inline-block",
    width: "0.75rem",
    "margin-right": "2rem",
    "text-align": "right",
    color: "gray",
  },
  'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
    width: "1.25rem",
  },
  'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
    width: "1.75rem",
  },
  'code[data-line-numbers-max-digits="4"] > [data-line]::before': {
    width: "2.25rem",
  },
  figcaption: {
    "font-size": "0.85rem",
    padding: "0.5rem 1rem",
    "border-radius": "4px 4px 0 0",
    "background-color": "RGBA(222,222,222,0.25)",
  },
  "pre button.rehype-pretty-copy": {
    position: "relative",
    "background-color": "RGBA(222,222,222,0.25)",
  },
};

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography({
      cssExtend: codeCss,
    }),
    presetIcons(),
  ],
  safelist: [...SocialLinks.map((social) => `i-mdi-${social.name}`)],
});
