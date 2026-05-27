import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updated_at: string;
};

export async function PostsStudioLayout({
  children,
  activeId,
}: {
  children: ReactNode;
  activeId?: string;
}) {
  const session = await getAdminSession();
  if (!session) redirect(ADMIN_ENTRY_PATH);

  const db = getDb();
  const posts =
    db &&
    ((await db`
      SELECT id, title, slug, published, updated_at
      FROM posts
      ORDER BY updated_at DESC
    `) as any[]);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh md:grid-cols-[20rem_1fr]">
        <aside className="border-b border-border md:border-b-0 md:border-r">
          <div className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Studio</div>
            <div className="mt-2 font-serif text-3xl leading-tight">Blog</div>
            <div className="mt-6 grid gap-3">
              <Link
                href={`${ADMIN_ENTRY_PATH}/posts/new`}
                className="border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors text-center"
              >
                New post
              </Link>
              <Link
                href={ADMIN_ENTRY_PATH}
                className="border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors text-center"
              >
                Back to studio
              </Link>
            </div>
          </div>

          <div className="border-t border-border">
            {!db && (
              <div className="p-6 text-sm text-foreground/75 font-light">
                DATABASE_URL isn’t configured yet.
              </div>
            )}

            {db && (
              <div className="max-h-[calc(100svh-220px)] overflow-auto">
                {(posts as PostRow[]).map((p) => {
                  const active = activeId === p.id;
                  return (
                    <Link
                      key={p.id}
                      href={`${ADMIN_ENTRY_PATH}/posts/${p.id}`}
                      className={[
                        "block border-b border-border px-6 py-4 transition-colors",
                        active ? "bg-foreground/5" : "hover:bg-foreground/5",
                      ].join(" ")}
                    >
                      <div className="text-xs uppercase tracking-[0.25em] text-foreground/55">
                        {p.published ? "Published" : "Draft"}
                      </div>
                      <div className="mt-2 font-serif text-xl leading-snug">{p.title}</div>
                      <div className="mt-2 text-sm text-foreground/60 font-light">/{p.slug}</div>
                    </Link>
                  );
                })}
                {(posts as any[])?.length === 0 && (
                  <div className="p-6 text-sm text-foreground/75 font-light">No posts yet.</div>
                )}
              </div>
            )}
          </div>
        </aside>

        <main className="min-w-0 px-6 py-10 md:px-10 md:py-12">{children}</main>
      </div>
    </div>
  );
}
