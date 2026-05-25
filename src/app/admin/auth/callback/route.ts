import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  createSession,
  getSessionCookieName,
  hashToken,
  isEmailAllowed,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/admin", req.url));

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL("/admin?error=db", req.url));

  const tokenHash = hashToken(token);
  const rows = (await db`
    SELECT id, email, expires_at, used_at
    FROM magic_link_tokens
    WHERE token_hash = ${tokenHash}
    LIMIT 1
  `) as any[];

  const row = rows[0] as
    | { id: string; email: string; expires_at: string; used_at: string | null }
    | undefined;

  if (!row) return NextResponse.redirect(new URL("/admin?error=invalid", req.url));
  if (row.used_at) return NextResponse.redirect(new URL("/admin?error=used", req.url));
  if (Date.now() > Date.parse(row.expires_at)) {
    return NextResponse.redirect(new URL("/admin?error=expired", req.url));
  }
  if (!isEmailAllowed(row.email)) {
    return NextResponse.redirect(new URL("/admin?error=not-allowed", req.url));
  }

  await db`
    UPDATE magic_link_tokens
    SET used_at = now()
    WHERE id = ${row.id} AND used_at IS NULL
  `;

  const session = createSession(row.email);
  if (!session) return NextResponse.redirect(new URL("/admin?error=session", req.url));

  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set(getSessionCookieName(), session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
