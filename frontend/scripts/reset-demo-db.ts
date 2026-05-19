import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";

config({ path: ".env" });
config({ override: true, path: ".env.local" });

function runScript(scriptName: string) {
  const result = spawnSync("npm", ["run", scriptName], {
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`npm run ${scriptName} failed`);
  }
}

function resolveLocalDatabasePath(databaseUrl: string) {
  if (!databaseUrl.startsWith("file:")) {
    throw new Error("Refusing to reset a non-local database. TURSO_DATABASE_URL must start with file:.");
  }

  const rawPath = databaseUrl.slice("file:".length);
  const resolvedPath = rawPath.startsWith("//")
    ? fileURLToPath(databaseUrl)
    : path.resolve(process.cwd(), rawPath);
  const dataDir = path.resolve(process.cwd(), "data");
  const relativePath = path.relative(dataDir, resolvedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Refusing to reset database outside frontend/data: ${resolvedPath}`);
  }

  return resolvedPath;
}

function removeIfExists(filePath: string) {
  if (!existsSync(filePath)) {
    return;
  }

  rmSync(filePath, { force: true });
  console.log(`Removed ${filePath}`);
}

const databaseUrl = process.env.TURSO_DATABASE_URL ?? "file:./data/mindguard.db";
const databasePath = resolveLocalDatabasePath(databaseUrl);

for (const suffix of ["", "-wal", "-shm"]) {
  removeIfExists(`${databasePath}${suffix}`);
}

runScript("db:migrate");
runScript("db:seed");
