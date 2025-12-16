import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

const contentDirectory = path.join(process.cwd(), "content");

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  published: boolean;
  slug: string;
}

export interface Post {
  metadata: PostMetadata;
  content: React.ReactElement;
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = path.parse(filename).name;
      return await getPostBySlug(slug);
    }),
  );

  // Filtrer les posts null et trier par date
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      return (
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
      );
    });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const components = useMDXComponents({});

    const { frontmatter, content } = await compileMDX<
      Omit<PostMetadata, "slug">
    >({
      source: fileContent,
      options: { parseFrontmatter: true },
      components,
    });

    return {
      metadata: {
        ...frontmatter,
        slug,
      },
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs() {
  const files = fs.readdirSync(contentDirectory);
  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: path.parse(file).name }));
  return slugs;
}
