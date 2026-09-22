import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: false,
  },
});

export async function dbConnTest(exit = false) {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connection OK");
    return true;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    if (exit) process.exit(1);
    return false;
  }
}
