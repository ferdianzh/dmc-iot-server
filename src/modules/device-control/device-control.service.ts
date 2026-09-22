import { mqttClient } from "../../config/mqtt.ts";
import type { DeviceCommandType } from "./device-control.types.ts";

export class DeviceControlService {
  async sendCommand(
    deviceId: string,
    command: DeviceCommandType,
  ): Promise<{ status: string; error?: Error }> {
    const topic = `greenhouse/control/${deviceId}`;

    const payload = JSON.stringify({
      command,
      timestamp: new Date().toISOString(),
    });

    return new Promise((resolve, reject) => {
      mqttClient.publish(topic, payload, { qos: 1, retain: false }, (error) => {
        if (error) {
          console.error(`failed to publish command to ${topic}:`, error);
          return resolve({ status: "failed", error });
        }

        console.log(`published command '${command}' to topic: '${topic}'`);
        return resolve({ status: "success" });
      });
    });
  }
}
