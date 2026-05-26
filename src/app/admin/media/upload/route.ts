import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

function safeName(name: string) {
  const base = name.split("/").pop() || "upload";
  return base.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

export async function POST(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }

  const ext = safeName(file.name);
  const key = `uploads/${crypto.randomUUID()}-${ext}`;

  const blob = await put(key, file, { access: "public", contentType: file.type || undefined });

  return NextResponse.json({ url: blob.url });
}

