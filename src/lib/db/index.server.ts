import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getDatabaseUrl, requireDatabaseUrl } from "./env.server";
import * as schema from "./schema";

export function getDb() {
  const sql = neon(requireDatabaseUrl());
  return drizzle({ client: sql, schema });
}

export { getDatabaseUrl, normalizeDatabaseEnv } from "./env.server";
