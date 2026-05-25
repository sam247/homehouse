import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const db = getDb();
  const posts =
    db &&
    (await db`
      SELECT id, slug, title, published, published_at, updated_at
      FROM posts
      ORDER BY updated_at DESC
    `);

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Studio</div>
            <h1 className="mt-3 font-serif text-4xl leading-tight">Blog posts</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
            >
              Back
            </Link>
            <Link
              href="/admin/posts/new"
              className="border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
            >
              New post
            </Link>
          </div>
        </div>

        {!db && (
          <div className="mt-10 border border-border p-8 text-foreground/75 font-light">
            DATABASE_URL isn’t configured yet.
          </div>
        )}

        {db && (
          <div className="mt-10 grid gap-4">
            {(posts as any[])?.map((p) => (
              <Link
                key={p.id}
                href={`/admin/posts/${p.id}`}
                className="border border-border p-6 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                      {p.published ? "Published" : "Draft"}
                    </div>
                    <div className="mt-2 font-serif text-2xl">{p.title}</div>
                    <div className="mt-3 text-sm text-foreground/70 font-light">/{p.slug}</div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
            {(posts as any[])?.length === 0 && (
              <div className="border border-border p-8 text-foreground/75 font-light">
                No posts yet.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
