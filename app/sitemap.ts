import { MetadataRoute } from "next";
import { glob } from "fast-glob";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://williamdeazevedo.fr";

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Articles de blog (MDX)
  const contentDir = path.join(process.cwd(), "content");
  const mdxFiles = await glob("*.mdx", { cwd: contentDir });

  const blogPages: MetadataRoute.Sitemap = mdxFiles.map((file) => {
    const slug = file.replace(".mdx", "");
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogPages];
}
