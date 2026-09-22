import mqtt from "mqtt";

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";

export const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  clientId: `express_backend_${Math.random().toString(16).substring(2, 8)}`,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

mqttClient.on("connect", () => {
  console.log("connected to mosquitto mqtt broker");
});

mqttClient.on("error", (err) => {
  console.error("mqtt client error:", err);
});
