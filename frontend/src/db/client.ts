import fs from "node:fs";
import path from "node:path";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "./schema";

const fallbackDatabaseUrl = "file:./data/mindguard.db";
const fallbackDatabasePath = path.join(process.cwd(), "data", "mindguard.db");
const globalForDb = globalThis as {
  __mindguardDb?: LibSQLDatabase<typeof schema>;
  __mindguardLibsqlClient?: ReturnType<typeof createClient>;
};

function ensureLocalDatabaseDirectory(url: string) {
  if (url !== fallbackDatabaseUrl) {
    return;
  }

  const directory = path.dirname(fallbackDatabasePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function getDatabaseUrl() {
  return process.env.TURSO_DATABASE_URL ?? fallbackDatabaseUrl;
}

export function getLibsqlClient() {
  if (!globalForDb.__mindguardLibsqlClient) {
    const url = getDatabaseUrl();

    ensureLocalDatabaseDirectory(url);

    globalForDb.__mindguardLibsqlClient = createClient({
      authToken: process.env.TURSO_AUTH_TOKEN,
      url,
    });
  }

  return globalForDb.__mindguardLibsqlClient;
}

export function getDb() {
  if (!globalForDb.__mindguardDb) {
    globalForDb.__mindguardDb = drizzle(getLibsqlClient(), { schema });
  }

  return globalForDb.__mindguardDb;
}

export const databaseUrl = getDatabaseUrl();
