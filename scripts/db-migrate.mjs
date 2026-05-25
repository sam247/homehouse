import fs from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    id text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )
`;

const migrationsDir = path.resolve("db", "migrations");
const migrationFiles = (await fs.readdir(migrationsDir))
  .filter((f) => f.endsWith(".sql"))
  .sort((a, b) => a.localeCompare(b));

const applied = await sql`SELECT id FROM schema_migrations`;
const appliedSet = new Set(applied.map((r) => r.id));

for (const file of migrationFiles) {
  if (appliedSet.has(file)) continue;

  const fullPath = path.join(migrationsDir, file);
  const script = await fs.readFile(fullPath, "utf8");

  process.stdout.write(`Applying ${file}...\n`);
  await sql(script);
  await sql`INSERT INTO schema_migrations (id) VALUES (${file})`;
}

process.stdout.write("Migrations complete.\n");
