import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--geist-font",
    },
  ],
  site: "https://williamdeazevedo.fr/",
  integrations: [mdx(), sitemap()],

  // Prefetch internal links on hover/focus so navigation feels instant
  // (improves perceived performance & Core Web Vitals). Astro skips this
  // automatically when the user has Save-Data enabled.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
