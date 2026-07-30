import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { getDb } from "@/lib/db";

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

function sortPostsByDateDesc(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
}

async function getMarkdownPostBySlug(slug: string): Promise<BlogPost | null> {
  const candidates = [path.join(BLOG_DIR, `${slug}.mdx`), path.join(BLOG_DIR, `${slug}.md`)];
  let filePath: string | undefined;

  for (const c of candidates) {
    try {
      await fs.access(c);
      filePath = c;
      break;
    } catch {}
  }

  if (!filePath) return null;

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

async function getAllMarkdownPosts(): Promise<BlogPost[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(BLOG_DIR)).filter(isMarkdownFile);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      return getMarkdownPostBySlug(slug);
    }),
  );

  return posts.filter((post): post is BlogPost => Boolean(post));
}

async function getAllDbPosts(): Promise<BlogPost[]> {
  const db = getDb();
  if (!db) return [];

  const rows = await db`
    SELECT slug, title, excerpt, cover_image_url, body_html, published_at
    FROM posts
    WHERE published = true
    ORDER BY published_at DESC NULLS LAST, updated_at DESC
  `;

  return (rows as any[]).map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? undefined,
    coverImage: r.cover_image_url ?? undefined,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : undefined,
    body: r.body_html ?? "",
  }));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const [dbPosts, markdownPosts] = await Promise.all([getAllDbPosts(), getAllMarkdownPosts()]);

  // Neon/admin posts win on slug collisions; markdown fills gaps (SEO support cluster).
  const bySlug = new Map<string, BlogPost>();
  for (const post of markdownPosts) bySlug.set(post.slug, post);
  for (const post of dbPosts) bySlug.set(post.slug, post);

  return sortPostsByDateDesc([...bySlug.values()]);
}

export async function getPostsPage({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 15;
  const offset = (safePage - 1) * safePageSize;

  const all = await getAllPosts();
  const posts = all.slice(offset, offset + safePageSize);
  return { posts, hasMore: offset + posts.length < all.length };
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const db = getDb();
  if (db) {
    const rows = await db`
      SELECT slug, title, excerpt, cover_image_url, body_html, published_at
      FROM posts
      WHERE slug = ${slug} AND published = true
      LIMIT 1
    `;
    const r = (rows as any[])[0];
    if (r) {
      return {
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt ?? undefined,
        coverImage: r.cover_image_url ?? undefined,
        publishedAt: r.published_at ? new Date(r.published_at).toISOString() : undefined,
        body: r.body_html ?? "",
      };
    }
  }

  const markdownPost = await getMarkdownPostBySlug(slug);
  if (markdownPost) return markdownPost;

  throw new Error(`Post not found: ${slug}`);
}
