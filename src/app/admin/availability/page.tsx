import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";
import { AvailabilityEditor } from "@/components/admin/AvailabilityEditor";

export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const db = getDb();
  if (!db) {
    return (
      <main className="min-h-screen bg-background text-foreground px-6 py-16">
        <div className="mx-auto w-full max-w-4xl border border-border p-10">
          <h1 className="font-serif text-4xl leading-tight">Availability</h1>
          <p className="mt-4 text-foreground/75 font-light">DATABASE_URL isn’t configured yet.</p>
          <div className="mt-10">
            <Link
              href="/admin"
              className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const rows = await db`
    SELECT id,
      start_date::text as start,
      end_date::text as end,
      label
    FROM availability_blocks
  `;

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Studio</div>
            <h1 className="mt-3 font-serif text-4xl leading-tight">Availability</h1>
          </div>
          <Link
            href="/admin"
            className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
          >
            Back
          </Link>
        </div>

        <AvailabilityEditor blocks={rows as any} />
      </div>
    </main>
  );
}
