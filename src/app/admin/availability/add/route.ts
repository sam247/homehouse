import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

function isDateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function POST(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.redirect(new URL("/admin", req.url));

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL("/admin/availability?error=db", req.url));

  const form = await req.formData();
  const start = String(form.get("start") ?? "");
  const end = String(form.get("end") ?? "");
  const label = String(form.get("label") ?? "").trim();

  if (!isDateString(start) || !isDateString(end)) {
    return NextResponse.redirect(new URL("/admin/availability?error=date", req.url));
  }

  await db`
    INSERT INTO availability_blocks (start_date, end_date, label)
    VALUES (${start}, ${end}, ${label || null})
  `;

  return NextResponse.redirect(new URL("/admin/availability", req.url));
}
