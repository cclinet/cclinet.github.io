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
