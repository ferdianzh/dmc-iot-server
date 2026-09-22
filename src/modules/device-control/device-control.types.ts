import { z } from "zod";

const commandEnum = z.enum(["ON", "OFF"]);

export const deviceControlSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  command: commandEnum,
});

export type DeviceControlDto = z.infer<typeof deviceControlSchema>;
export type DeviceCommandType = z.infer<typeof commandEnum>;
