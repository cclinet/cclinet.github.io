import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from "unocss";

import { SocialLinks } from "./src/consts";

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography({}),
    presetIcons(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: "LXGW WenKai",
      },
    }),
  ],
  safelist: [...SocialLinks.map(({ icons }) => icons)],
});
