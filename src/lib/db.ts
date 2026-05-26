import { neon } from "@neondatabase/serverless";

let cached: ReturnType<typeof neon> | null = null;

export function getDb() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return null;
  const trimmed = raw.trim();
  const url =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;

  if (!cached) {
    try {
      cached = neon(url);
    } catch {
      return null;
    }
  }
  return cached;
}
