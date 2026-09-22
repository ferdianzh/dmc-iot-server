import { z } from "zod";

export const createSensorDataSchema = z.object({
  sensorId: z.string().min(1, "Sensor ID is required"),
  temp: z.number().min(-50).max(100),
  tempUnit: z.enum(["c", "f"]),
  humidity: z.number().min(0).max(100),
});

export type CreateSensorDataDto = z.infer<typeof createSensorDataSchema>;

export interface SensorData {
  id: number;
  sensorId: string;
  temp: string;
  tempUnit: "c" | "f";
  humidity: string;
  createdAt: Date;
}
