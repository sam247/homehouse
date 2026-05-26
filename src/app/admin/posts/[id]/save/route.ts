import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { sanitizePostHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

async function ensureUniqueSlug(db: any, desired: string, id: string) {
  const base = desired || "post";
  for (let i = 0; i < 25; i++) {
    const attempt = i === 0 ? base : `${base}-${i + 1}`;
    const rows = await db`SELECT 1 FROM posts WHERE slug = ${attempt} AND id <> ${id} LIMIT 1`;
    if (!rows || rows.length === 0) return attempt;
  }
  return `${base}-${Date.now()}`;
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.redirect(new URL("/admin", req.url));

  const { id } = await ctx.params;

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL("/admin/posts?error=db", req.url));

  const existing = (await db`
    SELECT id, published, published_at
    FROM posts
    WHERE id = ${id}
    LIMIT 1
  `) as any[];
  if (!existing[0]) return NextResponse.redirect(new URL("/admin/posts", req.url));

  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const slugInput = String(form.get("slug") ?? "").trim();
  const excerpt = String(form.get("excerpt") ?? "").trim();
  const coverImageUrl = String(form.get("coverImageUrl") ?? "").trim();
  const bodyHtmlRaw = String(form.get("bodyHtml") ?? "");
  const published = form.get("published") === "on";

  if (!title) return NextResponse.redirect(new URL(`/admin/posts/${id}?error=title`, req.url));

  const baseSlug = slugify(slugInput || title);
  const slug = await ensureUniqueSlug(db, baseSlug, id);
  const bodyHtml = sanitizePostHtml(bodyHtmlRaw);

  const shouldSetPublishedAt = published && !existing[0].published_at;
  const publishedAt = shouldSetPublishedAt ? new Date().toISOString() : existing[0].published_at;

  await db`
    UPDATE posts
    SET slug = ${slug},
        title = ${title},
        excerpt = ${excerpt || null},
        cover_image_url = ${coverImageUrl || null},
        body_html = ${bodyHtml},
        published = ${published},
        published_at = ${published ? publishedAt : null},
        updated_at = now()
    WHERE id = ${id}
  `;

  return NextResponse.redirect(new URL(`/admin/posts/${id}`, req.url));
}
