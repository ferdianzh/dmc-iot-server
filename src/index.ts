import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { dbConnTest } from "./db/index.ts";
import { sensorRouter } from "./modules/sensor-data/sensor-data.route.ts";

const app: Express = express();
const host: string = process.env.APP_HOST || "localhost";
const port: number = Number(process.env.APP_PORT) || 3000;

await dbConnTest();

app.use(express.json());
app.use("/sensor-data", sensorRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `App started on: ${host === "localhost" ? "http" : "https"}://${host}:${port}`,
  );
});
