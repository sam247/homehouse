import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.redirect(new URL("/admin", req.url));

  const { id } = await ctx.params;

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL("/admin/availability?error=db", req.url));

  await db`DELETE FROM availability_blocks WHERE id = ${id}`;

  return NextResponse.redirect(new URL("/admin/availability", req.url));
}
