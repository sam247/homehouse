import Link from "next/link";
import type { ReactNode } from "react";
import { getAllowlistedEmail } from "@/lib/adminAuth";
import { getAdminSession } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl border border-border p-10 md:p-12">{children}</div>
    </main>
  );
}

function ErrorNote({ error }: { error: string }) {
  const message =
    error === "not-allowed"
      ? "That email isn’t allowed for this studio."
      : error === "db"
        ? "The database isn’t configured yet for this deployment."
        : error === "db-connect"
          ? "The app can’t connect to the database. Double-check DATABASE_URL and redeploy."
          : error === "db-migrate"
            ? "The database is reachable, but tables haven’t been created yet. Run npm run db:migrate."
            : error === "db-write"
              ? "Database write failed. Check Vercel function logs."
        : error === "invalid"
          ? "That link isn’t valid. Please request a new one."
          : error === "used"
            ? "That link has already been used. Please request a new one."
            : error === "expired"
              ? "That link has expired. Please request a new one."
              : error === "session"
                ? "Session configuration is missing. Set ADMIN_SESSION_SECRET."
                : "Something went wrong. Please request a new link.";

  return (
    <div className="mt-6 border border-border p-4 text-sm text-foreground/75 font-light">
      {message}
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const allowlistedEmail = getAllowlistedEmail();
  const session = await getAdminSession();

  if (!allowlistedEmail) {
    return (
      <Shell>
        <h1 className="font-serif text-4xl leading-tight">Admin</h1>
        <p className="mt-4 text-foreground/75 font-light leading-relaxed">
          This deployment hasn’t been configured yet.
        </p>
        <div className="mt-8 space-y-3 text-sm text-foreground/75 font-light">
          <p>
            Set <span className="text-foreground">ADMIN_ALLOWLIST_EMAIL</span>,{" "}
            <span className="text-foreground">ADMIN_SESSION_SECRET</span>,{" "}
            <span className="text-foreground">DATABASE_URL</span> and{" "}
            <span className="text-foreground">RESEND_API_KEY</span> then redeploy.
          </p>
          <p>Use the repo’s .env.example as the reference.</p>
        </div>
      </Shell>
    );
  }

  if (!session) {
    return (
      <Shell>
        <h1 className="font-serif text-4xl leading-tight">Welcome back.</h1>
        <p className="mt-4 text-foreground/75 font-light leading-relaxed">
          Enter your email and we’ll send a 6-digit code.
        </p>
        {error && <ErrorNote error={error} />}
        <form method="post" action="/admin/auth/request" className="mt-10 space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
              Email
              <input
                name="email"
                type="email"
                defaultValue={allowlistedEmail}
                required
                className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
          >
            Send code
          </button>
        </form>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl leading-tight">Studio</h1>
          <p className="mt-3 text-foreground/75 font-light leading-relaxed">
            A quiet place to write, publish, and set availability.
          </p>
        </div>
        <form method="post" action="/admin/auth/logout">
          <button
            type="submit"
            className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
          >
            Log out
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-4">
        <Link href="/admin/posts" className="border border-border p-6 hover:border-accent transition-colors">
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Blog</div>
          <div className="mt-2 font-serif text-2xl">Write & publish</div>
        </Link>
        <Link
          href="/admin/availability"
          className="border border-border p-6 hover:border-accent transition-colors"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Calendar</div>
          <div className="mt-2 font-serif text-2xl">Block out dates</div>
        </Link>
      </div>
    </Shell>
  );
}
