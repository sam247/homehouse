import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export const dynamic = "force-dynamic";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.redirect(new URL(ADMIN_ENTRY_PATH, req.url));

  const { id } = await ctx.params;

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/posts?error=db`, req.url));

  await db`DELETE FROM posts WHERE id = ${id}`;

  return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/posts`, req.url));
}
