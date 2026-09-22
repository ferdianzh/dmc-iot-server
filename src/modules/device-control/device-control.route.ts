import { Router, type Request, type Response } from "express";
import { validatePayload } from "../../middleware/validation.middleware.ts";
import { DeviceControlService } from "./device-control.service.ts";
import { deviceControlSchema } from "./device-control.types.ts";

const router = Router();
const deviceControlService = new DeviceControlService();

// POST /device-control
router.post(
  "/",
  validatePayload(deviceControlSchema),
  async (req: Request, res: Response) => {
    try {
      const data = await deviceControlService.sendCommand(
        req.body.deviceId,
        req.body.command,
      );
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send command" });
    }
  },
);
export const deviceControlRouter = router;
