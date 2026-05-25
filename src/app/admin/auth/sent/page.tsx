import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

export default async function SentPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;
  const link = token ? `${getSiteUrl()}/admin/auth/callback?token=${encodeURIComponent(token)}` : null;

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl border border-border p-10">
        <h1 className="font-serif text-4xl leading-tight">Check your email.</h1>
        {error === "db" && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            DATABASE_URL isn’t configured yet for this deployment.
          </p>
        )}
        {!error && (
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            If it doesn’t arrive within a minute, request a fresh link.
          </p>
        )}

        {link && (
          <div className="mt-8 space-y-3 text-sm text-foreground/75 font-light">
            <p>Dev mode link:</p>
            <a className="text-accent hover:underline break-all" href={link}>
              {link}
            </a>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.25em]">
          <Link href="/admin" className="text-foreground/70 hover:text-foreground transition-colors">
            Back
          </Link>
          <Link
            href="/admin"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Request again
          </Link>
        </div>
      </div>
    </main>
  );
}

