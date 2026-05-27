import Link from "next/link";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export const dynamic = "force-dynamic";

function messageForError(error: string) {
  if (error === "invalid") return "That code isn’t valid. Please request a new one.";
  if (error === "used") return "That code has already been used. Please request a new one.";
  if (error === "expired") return "That code has expired. Please request a new one.";
  return "Something went wrong. Please request a new code.";
}

export default async function OtpPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; email?: string; code?: string; error?: string }>;
}) {
  const { id, email, code, error } = await searchParams;

  if (!id || !email) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl border border-border p-10">
          <h1 className="font-serif text-4xl leading-tight">Sign in</h1>
          <p className="mt-4 text-foreground/75 font-light leading-relaxed">
            Request a new code.
          </p>
          <div className="mt-10">
            <Link href={ADMIN_ENTRY_PATH} className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors">
              Back
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl border border-border p-10">
        <h1 className="font-serif text-4xl leading-tight">Enter your code.</h1>
        <p className="mt-4 text-foreground/75 font-light leading-relaxed">
          We sent a 6-digit code to <span className="text-foreground">{email}</span>.
        </p>
        {error && (
          <div className="mt-6 border border-border p-4 text-sm text-foreground/75 font-light">
            {messageForError(error)}
          </div>
        )}
        <form method="post" action={`${ADMIN_ENTRY_PATH}/auth/verify`} className="mt-10 space-y-4">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="email" value={email} />
          <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
            Code
            <input
              name="code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              autoComplete="one-time-code"
              defaultValue={code ?? ""}
              required
              className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent tracking-[0.35em]"
            />
          </label>
          <button
            type="submit"
            className="w-full border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
          >
            Verify
          </button>
        </form>
        <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.25em]">
          <Link href={ADMIN_ENTRY_PATH} className="text-foreground/70 hover:text-foreground transition-colors">
            Back
          </Link>
          <Link href={ADMIN_ENTRY_PATH} className="text-foreground/70 hover:text-foreground transition-colors">
            Request again
          </Link>
        </div>
      </div>
    </main>
  );
}
