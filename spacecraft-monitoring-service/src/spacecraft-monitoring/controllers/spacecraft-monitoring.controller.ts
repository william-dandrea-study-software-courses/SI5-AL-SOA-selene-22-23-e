import {Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { SpacecraftMonitoringService } from "../services/spacecraft-monitoring.service";
import {Kafka} from "kafkajs";

@ApiTags("news")
@Controller("/spacecraft")
export class SpacecraftMonitoringController {
  private readonly logger = new Logger(SpacecraftMonitoringController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(private newsService:SpacecraftMonitoringService) {
    this.event_spacecraft_arriving_listener()
  }

  /*
  @MessagePattern("spacecraft-arriving")
   */
  async event_spacecraft_arriving_listener(){
    const consumer = this.kafka.consumer({ groupId: 'spacecraft-monitoring-arriving' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-arriving'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacecraft " + message.value.toLocaleString()+" arriving")
      },
    });
  }

  /*
@MessagePattern("spacecraft-landed")
 */
  async event_spacecraft_arriving_listener(){
    const consumer = this.kafka.consumer({ groupId: 'spacecraft-monitoring-landed' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-landed'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacecraft " + message.value.toLocaleString()+" landed")
      },
    });
  }

  @Get("/landed")
  @ApiOkResponse()
  async getLandedSpacecraft(): Promise<string[]> {
    this.logger.log("Récuperation des états des fusées");
    return this.newsService.get();
  }

  @Get("/arrriving")
  @ApiOkResponse()
  async getArrivingSpacecraft(): Promise<string[]> {
    this.logger.log("Récuperation des états des fusées");
    return this.newsService.get();
  }

  @Get("")
  @ApiOkResponse()
  async getAllState(): Promise<string[]> {
    this.logger.log("Récuperation des états des fusées");
    return this.newsService.get();
  }

}
