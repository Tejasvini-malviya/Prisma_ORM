import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env file");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

export default prisma;
