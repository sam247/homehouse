import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

type BookingRow = {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  name: string;
  start: string | null;
  end: string | null;
  created_at: string;
};

function statusLabel(status: BookingRow["status"]) {
  if (status === "confirmed") return "Confirmed";
  if (status === "cancelled") return "Cancelled";
  return "Pending";
}

export async function BookingsStudioLayout({
  children,
  activeId,
}: {
  children: ReactNode;
  activeId?: string;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const db = getDb();
  const bookings =
    db &&
    ((await db`
      SELECT
        id,
        status,
        name,
        start_date::text as start,
        end_date::text as "end",
        created_at::text as created_at
      FROM booking_requests
      ORDER BY
        CASE
          WHEN status = 'pending' THEN 0
          WHEN status = 'confirmed' THEN 1
          ELSE 2
        END ASC,
        created_at DESC
    `) as any[]);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh md:grid-cols-[20rem_1fr]">
        <aside className="border-b border-border md:border-b-0 md:border-r">
          <div className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Studio</div>
            <div className="mt-2 font-serif text-3xl leading-tight">Bookings</div>
            <div className="mt-6 grid gap-3">
              <Link
                href="/admin/availability"
                className="border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors text-center"
              >
                Availability
              </Link>
              <Link
                href="/admin"
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
                {(bookings as BookingRow[]).map((b) => {
                  const active = activeId === b.id;
                  const dates = b.start && b.end ? `${b.start} – ${b.end}` : "Dates not provided";
                  return (
                    <Link
                      key={b.id}
                      href={`/admin/bookings/${b.id}`}
                      className={[
                        "block border-b border-border px-6 py-4 transition-colors",
                        active ? "bg-foreground/5" : "hover:bg-foreground/5",
                      ].join(" ")}
                    >
                      <div className="text-xs uppercase tracking-[0.25em] text-foreground/55">
                        {statusLabel(b.status)}
                      </div>
                      <div className="mt-2 font-serif text-xl leading-snug">{b.name}</div>
                      <div className="mt-2 text-sm text-foreground/60 font-light">{dates}</div>
                    </Link>
                  );
                })}
                {(bookings as any[])?.length === 0 && (
                  <div className="p-6 text-sm text-foreground/75 font-light">No enquiries yet.</div>
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

