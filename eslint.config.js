import pluginJs from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: [".astro/*", "dist/*"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["all"],
];
