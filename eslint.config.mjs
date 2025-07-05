import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    ignores: ["public/js/**", "node_modules/**"],
  },

  // Front-end scripts that run in the browser
  {
    files: ["public/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
  },

  // Netlify serverless functions (Node runtime)
  {
    files: ["netlify/functions/**/*.js"],
    languageOptions: { globals: globals.node },
  },
]);