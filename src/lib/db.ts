import { config } from "dotenv";
config({ path: ".env.local" });

const { default: postgres } = await import("postgres");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const db = postgres(connectionString);

export type DbClient = typeof db;
