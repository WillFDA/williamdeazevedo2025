// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

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
  integrations: [react(), sitemap()],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
