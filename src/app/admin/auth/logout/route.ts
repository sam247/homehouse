import { NextResponse } from "next/server";
import { getCookieFromHeader, getSessionCookieName } from "@/lib/adminAuth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  const id = getCookieFromHeader(cookieHeader, getSessionCookieName());
  const db = getDb();
  if (db && id) {
    await db`DELETE FROM admin_sessions WHERE id = ${id}`;
  }

  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set(getSessionCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
