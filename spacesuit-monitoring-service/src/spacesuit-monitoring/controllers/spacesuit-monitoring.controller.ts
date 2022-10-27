import {Controller, Logger} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Kafka } from "kafkajs"
import {SpacesuitMonitoringService} from "../services/spacesuit-monitoring.service";

@ApiTags("spacesuit-monitoring")
@Controller("/")
export class SpacesuitMonitoringController {
  private readonly logger = new Logger(SpacesuitMonitoringController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(private spacesuitMonitoringService:SpacesuitMonitoringService) {
    this.event_spacesuit_vitals_listener()
  }

  /*
@MessageListener('spacesuit-vitals')
*/
  async event_spacesuit_vitals_listener(){
    const consumer = this.kafka.consumer({ groupId: 'spacesuit-monitoring-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacesuit-vitals'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let json = JSON.parse(message.value.toLocaleString());
        await this.spacesuitMonitoringService.verifyVitals(json['spacesuit_id'], json['cardiac_rythm'],json['pressure'],json['o2_rate'],json['temperature'],json['power'],json['astronaut_id']);
      },
    });
  }
}
