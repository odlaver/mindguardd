import path from "node:path";

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: path.join(process.cwd(), ".env") });
config({ override: true, path: path.join(process.cwd(), ".env.local") });

export default defineConfig({
  dialect: "turso",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    authToken: process.env.TURSO_AUTH_TOKEN,
    url: process.env.TURSO_DATABASE_URL ?? "file:./data/mindguard.db",
  },
  strict: true,
  verbose: true,
});
