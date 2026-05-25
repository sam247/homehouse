import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  getCookieFromHeader,
  getSessionCookieName,
  verifySession,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const cookieHeader = req.headers.get("cookie");
  const sessionToken = getCookieFromHeader(cookieHeader, getSessionCookieName());
  const session = verifySession(sessionToken);
  if (!session) return NextResponse.redirect(new URL("/admin", req.url));

  const { id } = await ctx.params;

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL("/admin/availability?error=db", req.url));

  await db`DELETE FROM availability_blocks WHERE id = ${id}`;

  return NextResponse.redirect(new URL("/admin/availability", req.url));
}

