import { getDb } from "@/lib/db";
import { getCookieFromHeader, getSessionCookieName } from "@/lib/adminAuth";

export async function requireAdmin(req: Request) {
  const db = getDb();
  if (!db) return null;

  const cookieHeader = req.headers.get("cookie");
  const id = getCookieFromHeader(cookieHeader, getSessionCookieName());
  if (!id) return null;

  const rows = (await db`
    SELECT email
    FROM admin_sessions
    WHERE id = ${id} AND expires_at > now()
    LIMIT 1
  `) as any[];

  const row = rows[0] as { email: string } | undefined;
  return row ? { email: row.email } : null;
}

