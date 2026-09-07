import path from "node:path";
import { glob } from "fast-glob";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://williamdeazevedo.fr";

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.8,
      url: `${baseUrl}/about`,
    },
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 0.9,
      url: `${baseUrl}/blog`,
    },
  ];

  // Articles de blog (MDX)
  const contentDir = path.join(process.cwd(), "content");
  const mdxFiles = await glob("*.mdx", { cwd: contentDir });

  const blogPages: MetadataRoute.Sitemap = mdxFiles.map((file) => {
    const slug = file.replace(".mdx", "");
    return {
      changeFrequency: "monthly" as const,
      lastModified: new Date(),
      priority: 0.7,
      url: `${baseUrl}/blog/${slug}`,
    };
  });

  return [...staticPages, ...blogPages];
}
