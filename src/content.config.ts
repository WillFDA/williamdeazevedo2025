import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

// Articles (blog). Files prefixed with `_` are ignored, so you can keep
// work-in-progress drafts out of the build entirely.
const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // `pubDate` doubles as the scheduled release date: an article is not
    // rendered (and gets no page) until this date is reached. See
    // `src/lib/articles.ts`.
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default("William De Azevedo"),
    // Force-hide an article regardless of its date.
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
