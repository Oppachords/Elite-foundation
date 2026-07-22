import { execSync } from "node:child_process";
import { normalizeDatabaseEnv } from "../src/lib/db/env.server";

const url = normalizeDatabaseEnv();

if (url) {
  console.log("Database URL found — running migrations and seed...");
  execSync("npx drizzle-kit push", { stdio: "inherit" });
  execSync("npx tsx scripts/seed.ts", { stdio: "inherit" });
} else {
  console.warn("\n⚠ No database URL found.");
  console.warn("  Expected one of: DATABASE_URL, POSTGRES_URL, POSTGRES_URL_NON_POOLING");
  console.warn("  In Vercel: Storage → Neon → Connect to Project (so env vars reach builds).");
}

execSync("vite build", { stdio: "inherit" });
