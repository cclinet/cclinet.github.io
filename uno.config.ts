import {
  defineConfig,
  toEscapedSelector as e,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from "unocss";

import { GithubIcon, ZhihuIcon, rssIcon, trainIcon } from "./icon";
import { SocialLinks } from "./src/consts";

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography({}),
    presetIcons({
      collections: {
        custom: {
          rss: rssIcon,
          train: trainIcon,
          zhihu: ZhihuIcon,
          github: GithubIcon,
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
  safelist: [...SocialLinks.map(({ icons }) => icons)],
  rules: [
    [
      /^li-marker-\[(.+)\]$/,
      ([, content], { rawSelector }) => {
        const selector = e(rawSelector);
        // 返回一个字符串而不是对象
        return `
${selector}::marker {
  content: "${content}";
}
`;
      },
    ],
  ],
});
