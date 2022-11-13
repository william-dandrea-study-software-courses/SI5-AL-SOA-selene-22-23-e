import {Controller, Logger} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Kafka } from "kafkajs"
import {NewsFormalisationService} from "../services/news-formalisation.service";

@ApiTags("spacesuit-monitoring")
@Controller("/")
export class NewsFormalisationController {
  private readonly logger = new Logger(NewsFormalisationController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(private spacesuitMonitoringService:NewsFormalisationService) {
    this.event_spacesuit_problem_listener();
    this.event_dangerous_meteorite();
    this.event_astronaut_dead_listener();
  }

  /*
@MessageListener('problem-spacesuit')
*/
  async event_spacesuit_problem_listener(){
    const consumer = this.kafka.consumer({ groupId: 'news-formalisation-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'problem-spacesuit'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacesuit problem detected value: " + message.value.toLocaleString())
        this.logger.log("Spacesuit id : " + JSON.parse(message.value.toLocaleString())["spacesuit_id"])
        await this.spacesuitMonitoringService.sendNewsSpacesuitToMary(JSON.parse(message.value.toLocaleString()));
      },
    });
  }


  /*
@MessageListener('dangerous-meteorite')
 */
  async event_dangerous_meteorite() {
    const consumer = this.kafka.consumer({ groupId: "news-formalisation-meteorite-consumer" });
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: "dangerous-meteorite" });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("A dangerous meteorite has been detected");
        await this.spacesuitMonitoringService.sendNewsMeteoriteToMarie();
      },
    });
  }

  /*
@MessageListener('astronaut-dead')
*/
  async event_astronaut_dead_listener(){
    const consumer = this.kafka.consumer({ groupId: 'astronaut-dead-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'astronaut-dead'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {

        this.logger.log("Astronaut dead detected, value: " + message.value.toLocaleString())
        this.logger.log("Astronaut id : " + JSON.parse(message.value.toLocaleString())["astronaut_id"])
        await this.spacesuitMonitoringService.sendNewsAstronautToMary(JSON.parse(message.value.toLocaleString()));
      },
    });
  }
}
