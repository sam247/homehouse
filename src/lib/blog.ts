import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  body: string;
};

const BLOG_DIR = path.resolve("content", "blog");

function isMarkdownFile(name: string) {
  return name.endsWith(".md") || name.endsWith(".mdx");
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = (await fs.readdir(BLOG_DIR)).filter(isMarkdownFile);
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      return getPostBySlug(slug);
    }),
  );

  return posts.sort((a, b) => {
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const candidates = [path.join(BLOG_DIR, `${slug}.mdx`), path.join(BLOG_DIR, `${slug}.md`)];
  let filePath: string | undefined;

  for (const c of candidates) {
    try {
      await fs.access(c);
      filePath = c;
      break;
    } catch {}
  }

  if (!filePath) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : undefined,
    body: parsed.content.trim(),
  };
}
