import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
} from "unocss";

import {
  ENLight,
  GithubIcon,
  ZHLight,
  ZhihuIcon,
  rssIcon,
  trainIcon,
} from "./icon";
import { SocialLinks } from "./src/consts";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind3(),
    presetTypography({}),
    presetIcons({
      collections: {
        custom: {
          rss: rssIcon,
          train: trainIcon,
          zhihu: ZhihuIcon,
          github: GithubIcon,
          zhLight: ZHLight,
          enLight: ENLight,
        },
      },
    }),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: "LXGW WenKai",
      },
    }),
  ],
  safelist: [...SocialLinks.map(({ icon }) => icon), "i-custom:ZHLight", "i-custom:ENLight"],
});
