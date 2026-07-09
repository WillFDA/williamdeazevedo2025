import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://williamdeazevedo.fr/",
  integrations: [react(), mdx(), sitemap()],

  // <ClientRouter /> turns prefetch ON by default (prefetchAll, hover strategy)
  // — exactly the hover-time, full-page fetching that made the homepage hover
  // interactions feel laggy. Keep link prefetch disabled (the "disable link
  // prefetch" decision on 2026): the client router already makes navigation
  // feel instant without prefetching every link on hover. No links opt back in
  // via data-astro-prefetch, so this effectively disables prefetch.
  prefetch: {
    prefetchAll: false,
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
