import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

type BlockRow = { id: string; start: string; end: string; label: string | null };

export async function AvailabilityStudioLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect(ADMIN_ENTRY_PATH);

  const db = getDb();
  if (!db) {
    return (
      <div className="min-h-svh bg-background text-foreground">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <div className="border border-border p-10">
            <h1 className="font-serif text-4xl leading-tight">Availability</h1>
            <p className="mt-4 text-foreground/75 font-light">DATABASE_URL isn’t configured yet.</p>
            <div className="mt-10">
              <Link
                href={ADMIN_ENTRY_PATH}
                className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const blocks = (await db`
    SELECT
      id,
      start_date::text as start,
      end_date::text as "end",
      label
    FROM availability_blocks
    ORDER BY start_date ASC
  `) as any[];

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh md:grid-cols-[20rem_1fr]">
        <aside className="border-b border-border md:border-b-0 md:border-r">
          <div className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Studio</div>
            <div className="mt-2 font-serif text-3xl leading-tight">Calendar</div>
            <div className="mt-6 grid gap-3">
              <Link
                href={`${ADMIN_ENTRY_PATH}/bookings`}
                className="border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors text-center"
              >
                Bookings
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
            <div className="px-6 py-4 text-xs uppercase tracking-[0.25em] text-foreground/60">
              Blocks
            </div>
            <div className="max-h-[calc(100svh-240px)] overflow-auto">
              {(blocks as BlockRow[]).map((b) => (
                <div key={b.id} className="border-b border-border px-6 py-4">
                  <div className="text-sm text-foreground/85 font-light">
                    {b.start} – {b.end}
                  </div>
                  {b.label ? <div className="mt-2 text-sm text-foreground/60 font-light">{b.label}</div> : null}
                  <form method="post" action={`${ADMIN_ENTRY_PATH}/availability/${b.id}/delete`} className="mt-3">
                    <button
                      type="submit"
                      className="text-xs uppercase tracking-[0.25em] text-foreground/55 hover:text-foreground transition-colors"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              ))}
              {(blocks as any[])?.length === 0 ? (
                <div className="px-6 py-6 text-sm text-foreground/75 font-light">No blocked dates yet.</div>
              ) : null}
            </div>
          </div>
        </aside>

        <main className="min-w-0 px-6 py-10 md:px-10 md:py-12">{children}</main>
      </div>
    </div>
  );
}
