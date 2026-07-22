import { defineConfig } from "drizzle-kit";
import { getDatabaseUrl } from "./src/lib/db/env.server";

const url = getDatabaseUrl();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: url ?? "postgresql://placeholder:placeholder@localhost/placeholder",
  },
});
