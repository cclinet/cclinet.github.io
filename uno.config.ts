import {
  defineConfig,
  toEscapedSelector as e,
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
    presetIcons({
      collections: {
        custom: {
          rss: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 19"><path d="m16.417 9.579a7.917 7.917 0 1 1 -7.917-7.917 7.917 7.917 0 0 1 7.917 7.917zm-10.197 2.263a1.041 1.041 0 1 0 0 1.472 1.04 1.04 0 0 0 0-1.472zm7.137.985a8.109 8.109 0 0 0 -8.115-8.115.792.792 0 0 0 0 1.583 6.525 6.525 0 0 1 6.533 6.533.791.791 0 1 0 1.582-.001zm-3.368 0a4.747 4.747 0 0 0 -4.746-4.747.792.792 0 0 0 0 1.583 3.17 3.17 0 0 1 3.165 3.165.79.79 0 1 0 1.582-.001z"/></svg>',
          train:
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26"><g fill="none"><defs><mask id="pepiconsPencilTrainCircleFilled0"><path fill="#fff" d="M0 0h26v26H0z"/><g fill="#000"><path fill-rule="evenodd" d="M20 7.5A3.5 3.5 0 0 0 16.5 4h-7A3.5 3.5 0 0 0 6 7.5v6.955A3.5 3.5 0 0 0 8.465 17.8a15.3 15.3 0 0 0 4.535.7a15.3 15.3 0 0 0 4.535-.701A3.5 3.5 0 0 0 20 14.455zM7 14.455V7.5A2.5 2.5 0 0 1 9.5 5h7A2.5 2.5 0 0 1 19 7.5v6.955a2.5 2.5 0 0 1-1.76 2.388A14.3 14.3 0 0 1 13 17.5a14.3 14.3 0 0 1-4.24-.657A2.5 2.5 0 0 1 7 14.455" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 16a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0-2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m7 2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0-2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1" clip-rule="evenodd"/><path d="M18.532 21.676a.5.5 0 0 0 .936-.351l-1.5-4a.5.5 0 0 0-.936.35zm-10-4.351a.5.5 0 1 1 .936.35l-1.5 4a.5.5 0 0 1-.936-.35z"/><path fill-rule="evenodd" d="M18 8a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2.565a2 2 0 0 0 1.444 1.921Q11.22 13 13 13t3.556-.514A2 2 0 0 0 18 10.565zm-9 2.565V8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2.565a1 1 0 0 1-.722.96A11.8 11.8 0 0 1 13 12q-1.637 0-3.278-.474A1 1 0 0 1 9 10.565" clip-rule="evenodd"/><path d="M8.25 20.5a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1z"/></g></mask></defs><circle cx="13" cy="13" r="13" fill="currentColor" mask="url(#pepiconsPencilTrainCircleFilled0)"/></g></svg>',
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
