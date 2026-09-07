import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

const contentDirectory = path.join(process.cwd(), "content");

export interface PostMetadata {
  author: string;
  date: string;
  description: string;
  published: boolean;
  slug: string;
  tags: string[];
  title: string;
}

export interface Post {
  content: ComponentType;
  metadata: PostMetadata;
}

interface MDXModule {
  default: ComponentType;
  metadata: Omit<PostMetadata, "slug">;
}

async function importMDX(slug: string): Promise<MDXModule | null> {
  try {
    // Dynamic import of MDX files from content directory
    const mdxModule = (await import(`@/content/${slug}.mdx`)) as MDXModule;
    return mdxModule;
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = path.parse(filename).name;
      return await getPostBySlug(slug);
    })
  );

  const isDev = process.env.NODE_ENV === "development";

  return posts
    .filter((post): post is Post => post !== null)
    .filter((post) => {
      if (isDev) {
        return true;
      }
      const isPublished = post.metadata.published;
      const isReleased = new Date(post.metadata.date) <= new Date();
      return isPublished && isReleased;
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const mdxModule = await importMDX(slug);

  if (!mdxModule) {
    return null;
  }

  const post: Post = {
    content: mdxModule.default,
    metadata: {
      ...mdxModule.metadata,
      slug,
    },
  };

  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) {
    const isPublished = post.metadata.published;
    const isReleased = new Date(post.metadata.date) <= new Date();
    if (!(isPublished && isReleased)) {
      return null;
    }
  }

  return post;
}

export function getAllPostSlugs() {
  const files = fs.readdirSync(contentDirectory);
  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: path.parse(file).name }));
  return slugs;
}
