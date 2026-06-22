import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  // ponytail: Oxfmt does not format Astro templates yet; remove when support lands.
  ignorePatterns: [...ultracite.ignorePatterns, "**/*.astro"],
});
