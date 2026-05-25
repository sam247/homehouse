import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type AvailabilityBlock = { start: string; end: string; label?: string };

export async function GET() {
  const filePath = path.resolve("content", "availability", "blocks.json");
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as { blocks?: AvailabilityBlock[] };
    return NextResponse.json({ blocks: parsed.blocks ?? [] });
  } catch {
    return NextResponse.json({ blocks: [] });
  }
}
