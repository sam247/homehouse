import { spawnSync } from "node:child_process";

const cloud =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

const args = ["build", "--noTelemetry"];

if (cloud) {
  args.push("--content=local");
  args.push("--skip-cloud-checks", "--skip-indexing");
} else {
  args.push("--local", "--skip-indexing", "--skip-cloud-checks");
}

const res = spawnSync("tinacms", args, { stdio: "inherit" });

process.exit(typeof res.status === "number" ? res.status : 1);
