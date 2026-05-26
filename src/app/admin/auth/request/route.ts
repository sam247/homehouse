import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSiteUrl } from "@/lib/siteUrl";
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
    return NextResponse.redirect(new URL("/admin/auth/sent?error=db-connect", req.url));
  }

  const token = randomToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15).toISOString();

  try {
    await db`
      INSERT INTO magic_link_tokens (email, token_hash, expires_at)
      VALUES (${email}, ${tokenHash}, ${expiresAt})
    `;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    console.error("[admin-auth] Token insert failed");
    console.error(err);
    if (msg.includes("magic_link_tokens") && msg.includes("does not exist")) {
      return NextResponse.redirect(new URL("/admin/auth/sent?error=db-migrate", req.url));
    }
    return NextResponse.redirect(new URL("/admin/auth/sent?error=db-write", req.url));
  }

  const callbackUrl = `${getSiteUrl()}/admin/auth/callback?token=${encodeURIComponent(token)}`;

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM || "Home House <onboarding@resend.dev>";
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: "Your sign-in link",
        text: `Sign in: ${callbackUrl}\n\nThis link expires in 15 minutes.`,
      });

      return NextResponse.redirect(new URL("/admin/auth/sent", req.url));
    } catch {
      return NextResponse.redirect(
        new URL(`/admin/auth/sent?token=${encodeURIComponent(token)}`, req.url),
      );
    }
  }

  return NextResponse.redirect(
    new URL(`/admin/auth/sent?token=${encodeURIComponent(token)}`, req.url),
  );
}
