import mqtt from "mqtt";

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";

export const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  clientId: `express_backend_${Math.random().toString(16).substring(2, 8)}`,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

mqttClient.on("connect", () => {
  console.log("MQTT connection OK");
});

mqttClient.on("error", (err) => {
  console.error("Failed to connect to the MQTT broker");
});

export function mqttConnTest(exit = false): Promise<boolean> {
  return new Promise((resolve) => {
    if (mqttClient.connected) {
      console.log("MQTT connection OK");
      resolve(true);
    } else {
      console.error("Failed to connect to the MQTT broker");
      if (exit) process.exit(1);
      resolve(false);
    }
  });
}
