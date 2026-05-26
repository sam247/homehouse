import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  getSessionCookieName,
  hashToken,
  isEmailAllowed,
  randomSessionId,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get("id") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const code = String(form.get("code") ?? "").trim();

  if (!id || !email || !code) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (!isEmailAllowed(email)) {
    return NextResponse.redirect(new URL("/admin?error=not-allowed", req.url));
  }

  const db = getDb();
  if (!db) {
    return NextResponse.redirect(
      new URL(`/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&error=db`, req.url),
    );
  }

  const rows = (await db`
    SELECT id, email, token_hash, expires_at, used_at
    FROM magic_link_tokens
    WHERE id = ${id} AND email = ${email}
    LIMIT 1
  `) as any[];

  const row = rows[0] as
    | {
        id: string;
        email: string;
        token_hash: string;
        expires_at: string;
        used_at: string | null;
      }
    | undefined;

  if (!row) {
    return NextResponse.redirect(
      new URL(`/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&error=invalid`, req.url),
    );
  }
  if (row.used_at) {
    return NextResponse.redirect(
      new URL(`/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&error=used`, req.url),
    );
  }
  if (Date.now() > Date.parse(row.expires_at)) {
    return NextResponse.redirect(
      new URL(`/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&error=expired`, req.url),
    );
  }

  const candidateHash = hashToken(code);
  if (candidateHash !== row.token_hash) {
    return NextResponse.redirect(
      new URL(`/admin/auth/otp?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}&error=invalid`, req.url),
    );
  }

  await db`
    UPDATE magic_link_tokens
    SET used_at = now()
    WHERE id = ${row.id} AND used_at IS NULL
  `;

  const sessionId = randomSessionId();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

  await db`
    INSERT INTO admin_sessions (id, email, expires_at)
    VALUES (${sessionId}, ${row.email}, ${expiresAt})
  `;

  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set(getSessionCookieName(), sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
