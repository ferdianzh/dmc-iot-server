import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { sensorDataTable } from "../../db/schema.ts";
import type { CreateSensorDataDto, SensorData } from "./sensor-data.types.ts";

export class SensorDataService {
  async create(payload: CreateSensorDataDto): Promise<SensorData> {
    const [newData] = await db
      .insert(sensorDataTable)
      .values({
        sensorId: payload.sensorId,
        temp:
          typeof payload.temp === "number"
            ? payload.temp.toFixed(1)
            : payload.temp,
        tempUnit: payload.tempUnit,
        humidity:
          typeof payload.humidity === "number"
            ? payload.humidity.toFixed(1)
            : payload.humidity,
      })
      .returning();

    return newData;
  }

  async findAll(
    sensorId?: string,
    orderBy: string = "id",
    order: string = "asc",
  ): Promise<SensorData[]> {
    let query = db.select().from(sensorDataTable).$dynamic();

    if (sensorId) {
      query = query.where(eq(sensorDataTable.sensorId, sensorId));
    }

    switch (orderBy) {
      case "id":
        query = query.orderBy(
          order === "asc" ? asc(sensorDataTable.id) : desc(sensorDataTable.id),
        );
        break;
      case "sensorId":
        query = query.orderBy(
          order === "asc"
            ? asc(sensorDataTable.sensorId)
            : desc(sensorDataTable.sensorId),
        );
        break;
      case "createdAt":
        query = query.orderBy(
          order === "asc"
            ? asc(sensorDataTable.createdAt)
            : desc(sensorDataTable.createdAt),
        );
        break;
      default:
        query = query.orderBy(asc(sensorDataTable.id));
        break;
    }

    return await query;
  }
}
