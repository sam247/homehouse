import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { sanitizePostHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

async function ensureUniqueSlug(db: any, base: string) {
  let slug = base || "post";
  for (let i = 0; i < 25; i++) {
    const attempt = i === 0 ? slug : `${slug}-${i + 1}`;
    const rows = await db`SELECT 1 FROM posts WHERE slug = ${attempt} LIMIT 1`;
    if (!rows || rows.length === 0) return attempt;
  }
  return `${slug}-${Date.now()}`;
}

export async function POST(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.redirect(new URL("/admin", req.url));

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL("/admin/posts?error=db", req.url));

  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const slugInput = String(form.get("slug") ?? "").trim();
  const excerpt = String(form.get("excerpt") ?? "").trim();
  const coverImageUrl = String(form.get("coverImageUrl") ?? "").trim();
  const bodyHtmlRaw = String(form.get("bodyHtml") ?? "");
  const published = form.get("published") === "on";

  if (!title) return NextResponse.redirect(new URL("/admin/posts/new?error=title", req.url));

  const baseSlug = slugify(slugInput || title);
  const slug = await ensureUniqueSlug(db, baseSlug);
  const bodyHtml = sanitizePostHtml(bodyHtmlRaw);
  const publishedAt = published ? new Date().toISOString() : null;

  const rows = (await db`
    INSERT INTO posts (slug, title, excerpt, cover_image_url, body_html, published, published_at)
    VALUES (${slug}, ${title}, ${excerpt || null}, ${coverImageUrl || null}, ${bodyHtml}, ${published}, ${
      publishedAt
    })
    RETURNING id
  `) as any[];

  const id = rows[0]?.id as string | undefined;
  if (!id) return NextResponse.redirect(new URL("/admin/posts?error=save", req.url));

  return NextResponse.redirect(new URL(`/admin/posts/${id}`, req.url));
}
