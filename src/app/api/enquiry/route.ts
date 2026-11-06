import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

function isDateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  const db = getDb();
  if (!db) return NextResponse.json({ error: "db" }, { status: 503 });

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim().toLowerCase();
  const phone = String(payload?.phone ?? "").trim();
  const guests = String(payload?.guests ?? "").trim();
  const message = String(payload?.message ?? "").trim();
  const startDate = String(payload?.startDate ?? "").trim();
  const endDate = String(payload?.endDate ?? "").trim();
  const sourceUrl = String(payload?.sourceUrl ?? "").trim();

  // Honeypot: bots fill it; skip storing silently.
  if (String(payload?.website ?? "").trim()) return NextResponse.json({ ok: true });

  if (!name) return NextResponse.json({ error: "name" }, { status: 400 });
  if (!email || !isEmail(email)) return NextResponse.json({ error: "email" }, { status: 400 });

  const hasDates = Boolean(startDate || endDate);
  if (hasDates) {
    if (!isDateString(startDate) || !isDateString(endDate)) {
      return NextResponse.json({ error: "dates" }, { status: 400 });
    }
  }

  if (hasDates) {
    const conflicts = (await db`
      SELECT 1
      FROM (
        SELECT start_date, end_date
        FROM availability_blocks
        UNION ALL
        SELECT start_date, end_date
        FROM booking_requests
        WHERE status IN ('pending', 'confirmed') AND start_date IS NOT NULL AND end_date IS NOT NULL
      ) r
      WHERE NOT (${endDate}::date < r.start_date OR ${startDate}::date > r.end_date)
      LIMIT 1
    `) as any[];

    if (conflicts.length > 0) {
      return NextResponse.json({ error: "unavailable" }, { status: 409 });
    }
  }

  const rows = (await db`
    INSERT INTO booking_requests (
      status,
      name,
      email,
      phone,
      guests,
      message,
      internal_notes,
      start_date,
      end_date,
      source_url
    )
    VALUES (
      'pending',
      ${name},
      ${email},
      ${phone || null},
      ${guests || null},
      ${message || null},
      null,
      ${hasDates ? startDate : null},
      ${hasDates ? endDate : null},
      ${sourceUrl || null}
    )
    RETURNING id
  `) as any[];

  const id = rows?.[0]?.id as string | undefined;
  if (!id) return NextResponse.json({ error: "db_write" }, { status: 500 });

  // Notifications are delivered by Better Ranking Communications (posted from the client).
  return NextResponse.json({ ok: true, id });
}
