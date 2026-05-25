import { cookies } from "next/headers";
import { getSessionCookieName, verifySession } from "@/lib/adminAuth";

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(getSessionCookieName())?.value ?? null;
  return verifySession(token);
}
