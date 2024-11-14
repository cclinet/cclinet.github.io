import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from "unocss";

import { SocialLinks } from "./src/consts";

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography(),
    presetIcons(),
  ],
  safelist: [...SocialLinks.map((social) => `i-mdi-${social.name}`)],
});
