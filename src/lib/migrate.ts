import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { db, type DbClient } from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

export interface Migration {
  name: string;
  sql: string;
}

export function getMigrations(): Migration[] {
  const migrationsDir = join(__dirname, "migrations");
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  return files.map((file) => ({
    name: file,
    sql: readFileSync(join(migrationsDir, file), "utf-8"),
  }));
}

export async function runMigrations(client: DbClient = db): Promise<void> {
  const migrations = getMigrations();

  // Create migrations tracking table if not exists
  await client`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  const executed = await client`SELECT name FROM _migrations`;
  const executedNames = new Set(executed.map((r) => r.name));

  for (const migration of migrations) {
    if (executedNames.has(migration.name)) {
      console.log(`⏭️  Skipping ${migration.name} (already executed)`);
      continue;
    }

    console.log(`🔄 Running migration: ${migration.name}`);
    try {
      await client.begin(async (tx) => {
        await tx.unsafe(migration.sql);
        await tx`INSERT INTO _migrations (name) VALUES (${migration.name})`;
      });
      console.log(`✅ Completed: ${migration.name}`);
    } catch (error) {
      console.error(`❌ Failed: ${migration.name}`, error);
      throw error;
    }
  }

  console.log("🎉 All migrations completed");
}

export async function rollbackMigration(name: string, client: DbClient = db): Promise<void> {
  // This would require down migrations - implement as needed
  console.warn("Rollback not implemented - manual intervention required");
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}