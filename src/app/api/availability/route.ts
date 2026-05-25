import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type AvailabilityBlock = { start: string; end: string; label?: string };

export async function GET() {
  const db = getDb();
  if (db) {
    const rows = await db`
      SELECT start_date::text as start, end_date::text as end, label
      FROM availability_blocks
      ORDER BY start_date ASC
    `;
    return NextResponse.json({ blocks: rows ?? [] });
  }

  const filePath = path.resolve("content", "availability", "blocks.json");
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as { blocks?: AvailabilityBlock[] };
    return NextResponse.json({ blocks: parsed.blocks ?? [] });
  } catch {
    return NextResponse.json({ blocks: [] });
  }
}
