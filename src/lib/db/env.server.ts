/** Vercel Neon Storage injects POSTGRES_URL (and related vars), not DATABASE_URL. */
export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.NEON_DATABASE_URL
  );
}

export function requireDatabaseUrl(): string {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error(
      "No database URL found. Set DATABASE_URL (or POSTGRES_URL from Vercel Neon) in your environment.",
    );
  }
  return url;
}

/** Normalize so drizzle-kit, seed script, and runtime all use DATABASE_URL. */
export function normalizeDatabaseEnv() {
  const url = getDatabaseUrl();
  if (url) process.env.DATABASE_URL = url;
  return url;
}
