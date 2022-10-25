import {Injectable, Logger} from '@nestjs/common';
import {Kafka} from "kafkajs";

@Injectable()
export class AppService {

  private readonly logger: Logger = new Logger(AppService.name);
  private kafka = new Kafka({
    clientId: "spacesuit",
    brokers: ["kafka-service:9092"],
  });

  constructor() {}


  getHello(): string {
    return 'Hello World!';
  }

  public async processSpacesuitEvent(spacesuitEvent: any) {
    this.logger.log(spacesuitEvent)

    const currentVitals = spacesuitEvent.current_vitals;
    // alert : o2 <95% / 70 < rythme cardique < 130 / 35 < temp < 38.3

    const o2alert: boolean = currentVitals.o2_rate < 95;
    const heartbeatAlert: boolean = currentVitals.cardiac_rythm < 70 || currentVitals.cardiac_rythm > 130;
    const temperatureAlert: boolean = currentVitals.temperature < 35 || currentVitals.temperature > 38.3;
    const pressureAlert: boolean = currentVitals.pressure < 0.8 || currentVitals.pressure > 1.2;
    const powerAlert: boolean = currentVitals.power < 25;

    if (o2alert || heartbeatAlert || temperatureAlert || pressureAlert || powerAlert) {
      const alertMessage: any = {
        o2_alert: o2alert,
        heartbeat_alert: heartbeatAlert,
        temperature_alert: temperatureAlert,
        pressure_alert: pressureAlert,
        power_alert: powerAlert,
        spacesuit_metrics: spacesuitEvent,
      }
      this.logger.log(alertMessage);

      await this.sendMessageToBus("spacesuit_alert_topic", "spacesuit_alert", JSON.stringify(alertMessage))
    }
  }










  async sendMessageToBus(topic: string, key: string, message: any) {
    const producer = await this.kafka.producer();

    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          key: key,
          value: JSON.stringify(message),
        },
      ],
    });
    await producer.disconnect();
  }


}
