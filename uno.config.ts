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
