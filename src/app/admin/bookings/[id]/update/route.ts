import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export const dynamic = "force-dynamic";

function isStatus(value: string): value is "pending" | "confirmed" | "cancelled" {
  return value === "pending" || value === "confirmed" || value === "cancelled";
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.redirect(new URL(ADMIN_ENTRY_PATH, req.url));

  const { id } = await ctx.params;

  const db = getDb();
  if (!db) return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/bookings?error=db`, req.url));

  const form = await req.formData();
  const statusRaw = String(form.get("status") ?? "").trim();
  const notesRaw = String(form.get("internalNotes") ?? "");

  const hasStatus = Boolean(statusRaw);
  const hasNotes = form.has("internalNotes");

  if (!hasStatus && !hasNotes) {
    return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/bookings/${id}`, req.url));
  }

  if (hasStatus && !isStatus(statusRaw)) {
    return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/bookings/${id}?error=status`, req.url));
  }

  if (hasStatus && hasNotes) {
    await db`
      UPDATE booking_requests
      SET status = ${statusRaw},
          internal_notes = ${notesRaw.trim() || null},
          updated_at = now()
      WHERE id = ${id}
    `;
    return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/bookings/${id}`, req.url));
  }

  if (hasStatus) {
    await db`
      UPDATE booking_requests
      SET status = ${statusRaw},
          updated_at = now()
      WHERE id = ${id}
    `;
    return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/bookings/${id}`, req.url));
  }

  await db`
    UPDATE booking_requests
    SET internal_notes = ${notesRaw.trim() || null},
        updated_at = now()
    WHERE id = ${id}
  `;

  return NextResponse.redirect(new URL(`${ADMIN_ENTRY_PATH}/bookings/${id}`, req.url));
}
