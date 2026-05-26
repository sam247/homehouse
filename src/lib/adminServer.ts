import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { getSessionCookieName } from "@/lib/adminAuth";

export async function getAdminSession() {
  const jar = await cookies();
  const id = jar.get(getSessionCookieName())?.value ?? null;
  if (!id) return null;

  const db = getDb();
  if (!db) return null;

  const rows = (await db`
    SELECT email
    FROM admin_sessions
    WHERE id = ${id} AND expires_at > now()
    LIMIT 1
  `) as any[];

  const row = rows[0] as { email: string } | undefined;
  if (!row) return null;
  return { email: row.email };
}
