import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const { id } = await params;
  const db = getDb();
  if (!db) redirect("/admin/posts?error=db");

  const rows = (await db`
    SELECT id, slug, title, excerpt, cover_image_url, body_html, published
    FROM posts
    WHERE id = ${id}
    LIMIT 1
  `) as any[];
  const post = rows[0] as any;
  if (!post) redirect("/admin/posts");

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Editing</div>
      <h1 className="mt-3 font-serif text-4xl leading-tight">{post.title}</h1>

      <PostEditor
        action={`/admin/posts/${post.id}/save`}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          coverImageUrl: post.cover_image_url ?? "",
          published: Boolean(post.published),
          bodyHtml: post.body_html ?? "",
        }}
      />

      <form method="post" action={`/admin/posts/${post.id}/delete`} className="mt-6">
        <button
          type="submit"
          className="w-full border border-border px-4 py-4 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
