import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/db";
import { SITE } from "@/lib/site";

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

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM || "Home House <onboarding@resend.dev>";
    const notifyTo = process.env.ENQUIRY_NOTIFY_TO || SITE.email;

    const datesLine = hasDates ? `${startDate} – ${endDate}` : "(not provided)";

    try {
      await resend.emails.send({
        from,
        to: notifyTo,
        subject: `New enquiry: ${name}`,
        text: [
          `New enquiry received`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "(not provided)"}`,
          `Dates: ${datesLine}`,
          `Guests: ${guests || "(not provided)"}`,
          ``,
          `Message:`,
          message || "(not provided)",
          ``,
          `Admin: ${process.env.SITE_URL || ""}/admin/bookings`,
          `ID: ${id}`,
          sourceUrl ? `Source: ${sourceUrl}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      });

      await resend.emails.send({
        from,
        to: email,
        subject: "We’ve received your enquiry",
        text: [
          `Thank you ${name},`,
          ``,
          `We’ve received your enquiry and we’ll reply personally, usually within a day.`,
          ``,
          `Dates: ${datesLine}`,
          `Guests: ${guests || "(not provided)"}`,
          ``,
          `Your message:`,
          message || "(not provided)",
          ``,
          `Home House Homestead`,
        ].join("\n"),
      });
    } catch {}
  }

  return NextResponse.json({ ok: true, id });
}
