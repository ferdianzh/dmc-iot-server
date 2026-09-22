import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const tempUnitEnum = pgEnum("temp_unit", ["c", "f"]);

export const sensorDataTable = pgTable("sensor_data", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sensorId: varchar("sensor_id", { length: 255 }).notNull(),
  temp: decimal("temp", { precision: 4, scale: 1 }).notNull(),
  tempUnit: tempUnitEnum("temp_unit").notNull(),
  humidity: decimal("humidity", { precision: 4, scale: 1 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
