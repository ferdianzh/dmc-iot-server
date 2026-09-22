import { Router, type Request, type Response } from "express";
import { validatePayload } from "../../middleware/validation.middleware.ts";
import { createSensorDataSchema } from "./sensor-data.types.ts";
import { SensorDataService } from "./sensor-data.service.ts";

const router = Router();
const sensorDataService = new SensorDataService();

// POST /sensor-data
router.post(
  "/",
  validatePayload(createSensorDataSchema),
  async (req: Request, res: Response) => {
    try {
      const data = await sensorDataService.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to record sensor data" });
    }
  },
);

// GET /sensor-data
router.get("/", async (req: Request, res: Response) => {
  try {
    const sensorId = req.query.sensorId?.toString();
    const orderBy = req.query.orderBy?.toString();
    const order = req.query.order?.toString();

    const data = await sensorDataService.findAll(sensorId, orderBy, order);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});

export const sensorRouter = router;
