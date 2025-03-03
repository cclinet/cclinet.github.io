import eslintPluginAstro from "eslint-plugin-astro";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: [".astro/*", "dist/*"] },
  ...eslintPluginAstro.configs.recommended,
];
