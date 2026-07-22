import { execSync } from "node:child_process";

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.NEON_DATABASE_URL
  );
}

const url = getDatabaseUrl();
if (url) {
  process.env.DATABASE_URL = url;
  console.log("Database URL found — pushing schema...");
  execSync("npx drizzle-kit push", { stdio: "inherit", env: process.env });
} else {
  console.warn("\n⚠ No database URL found.");
  console.warn("  Expected: POSTGRES_URL (from Vercel Neon) or DATABASE_URL\n");
}

process.env.NITRO_PRESET = "vercel";

execSync("npx vite build", { stdio: "inherit", env: process.env });
