import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add your Neon connection string to Vercel env vars.");
  }
  return url;
}

export function getDb() {
  const sql = neon(getDatabaseUrl());
  return drizzle({ client: sql, schema });
}
