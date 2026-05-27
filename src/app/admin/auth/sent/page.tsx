import Link from "next/link";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export const dynamic = "force-dynamic";

export default async function SentPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl border border-border p-10">
        <h1 className="font-serif text-4xl leading-tight">Check your email.</h1>
        {error === "db" && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            DATABASE_URL isn’t configured yet for this deployment.
          </p>
        )}
        {error === "db-connect" && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            The app can’t connect to the database. Double-check DATABASE_URL (no quotes/backticks) and redeploy.
          </p>
        )}
        {error === "db-migrate" && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            The database is reachable, but tables haven’t been created yet. Run <span className="text-foreground">npm run db:migrate</span> against your Neon DATABASE_URL.
          </p>
        )}
        {error === "db-write" && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            Database write failed. Check Vercel function logs for the exact error, then try again.
          </p>
        )}
        {!error && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            If it doesn’t arrive within a minute, request a fresh code.
          </p>
        )}

        <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.25em]">
          <Link href={ADMIN_ENTRY_PATH} className="text-foreground/70 hover:text-foreground transition-colors">
            Back
          </Link>
          <Link
            href={ADMIN_ENTRY_PATH}
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Request again
          </Link>
        </div>
      </div>
    </main>
  );
}
