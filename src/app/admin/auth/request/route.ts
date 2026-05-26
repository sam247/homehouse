import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashToken, isEmailAllowed, randomToken } from "@/lib/adminAuth";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return NextResponse.redirect(new URL("/admin", req.url));
}

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();

  if (!email || !isEmailAllowed(email)) {
    return NextResponse.redirect(new URL("/admin?error=not-allowed", req.url));
  }

  const db = getDb();
  if (!db) {
    return NextResponse.redirect(new URL("/admin/auth/sent?error=db", req.url));
  }

  try {
    await db`SELECT 1`;
  } catch (err) {
    console.error("[admin-auth] DB connection failed");
    console.error(err);
    return NextResponse.redirect(new URL("/admin?error=db-connect", req.url));
  }

  const otp = String(Number.parseInt(randomToken().slice(0, 12), 16) % 1_000_000).padStart(6, "0");
  const tokenHash = hashToken(otp);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15).toISOString();
  let id: string | null = null;

  try {
    const rows = (await db`
      INSERT INTO magic_link_tokens (email, token_hash, expires_at)
      VALUES (${email}, ${tokenHash}, ${expiresAt})
      RETURNING id
    `) as any[];
    id = rows?.[0]?.id ?? null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    console.error("[admin-auth] Token insert failed");
    console.error(err);
    if (msg.includes("magic_link_tokens") && msg.includes("does not exist")) {
      return NextResponse.redirect(new URL("/admin?error=db-migrate", req.url));
    }
    return NextResponse.redirect(new URL("/admin?error=db-write", req.url));
  }

  if (!id) {
    return NextResponse.redirect(new URL("/admin?error=db-write", req.url));
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM || "Home House <onboarding@resend.dev>";
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: "Your sign-in code",
        text: `Your code: ${otp}\n\nThis code expires in 15 minutes.`,
      });

      return NextResponse.redirect(
        new URL(`/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`, req.url),
      );
    } catch (err) {
      console.error("[admin-auth] Resend send failed");
      console.error(err);
      return NextResponse.redirect(
        new URL(
          `/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&code=${encodeURIComponent(otp)}`,
          req.url,
        ),
      );
    }
  }

  return NextResponse.redirect(
    new URL(
      `/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&code=${encodeURIComponent(otp)}`,
      req.url,
    ),
  );
}
