import "dotenv/config";
import { normalizeDatabaseEnv } from "../src/lib/db/env.server";
import { getDb } from "../src/lib/db/index.server";
import { sponsoredChildren } from "../src/lib/db/schema";

/** Optional local seed — verifies DB connection only. Content comes from site-data fallback or admin CMS. */
async function seed() {
  if (!normalizeDatabaseEnv()) {
    throw new Error("No database URL found. Set DATABASE_URL or POSTGRES_URL.");
  }

  const db = getDb();
  await db.select().from(sponsoredChildren).limit(1);
  console.log("Database connected. Tables ready.");
  console.log("Projects/gallery use bundled assets until admin adds CMS content.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
