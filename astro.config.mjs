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

  // Prefetch internal links on intent (pointer-down / touch-start) rather than
  // on hover. Hover prefetch fires a full-page fetch every time the cursor
  // crosses a link, which competes with the homepage hover micro-interactions
  // on the main thread and makes them feel laggy. "tap" keeps navigation
  // near-instant (the request starts a few ms before the click) without the
  // hover jank. Astro still skips prefetch when Save-Data is enabled.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "tap",
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
