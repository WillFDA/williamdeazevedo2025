import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://williamdeazevedo.fr";

  return {
    host: baseUrl,
    rules: [
      {
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
