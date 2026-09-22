import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { dbConnTest } from "./db/index.ts";
import { sensorRouter } from "./modules/sensor-data/sensor-data.route.ts";
import { deviceControlRouter } from "./modules/device-control/device-control.route.ts";
import { mqttConnTest } from "./config/mqtt.ts";

const app: Express = express();
const host: string = process.env.APP_HOST || "localhost";
const port: number = Number(process.env.APP_PORT) || 3000;

await dbConnTest(true);
await mqttConnTest(true);

app.use(express.json());
app.use("/sensor-data", sensorRouter);
app.use("/device-control", deviceControlRouter);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/status");
});

app.get("/status", async (req: Request, res: Response) => {
  res.json({
    db: await dbConnTest(),
    mqtt: await mqttConnTest(),
  });
});

app.listen(port, () => {
  console.log(
    `App started on: ${host === "localhost" ? "http" : "https"}://${host}:${port}`,
  );
});
