import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: false,
  },
});

export async function dbConnTest() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}
