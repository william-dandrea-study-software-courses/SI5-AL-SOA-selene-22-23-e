import {Controller, Get, Logger} from "@nestjs/common";
import {ApiOkResponse, ApiTags,} from "@nestjs/swagger";
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

  constructor(private spacecraftMonitoringService:SpacecraftMonitoringService) {
    this.event_spacecraft_arriving_listener();
    this.event_spacecraft_landed_listener();
    this.event_spacecraft_launch_listener();
    this.event_spacecraft_damaged_listener();
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
        this.spacecraftMonitoringService.spacecraftArriving(message.value.toLocaleString())
      },
    });
  }

  /*
@MessagePattern("spacecraft-landed")
 */
  async event_spacecraft_landed_listener(){
    const consumer = this.kafka.consumer({ groupId: 'spacecraft-monitoring-landed' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-landed'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacecraft " + message.value.toLocaleString()+" landed")
        this.spacecraftMonitoringService.spacecraftLanded(message.value.toLocaleString())
      },
    });
  }


  /*
@MessagePattern("spacecraft-launch")
 */
  async event_spacecraft_launch_listener(){
    const consumer = this.kafka.consumer({ groupId: 'spacecraft-monitoring-launch' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-launch'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let messageJson = JSON.parse(message.value.toLocaleString());
        this.logger.log("Spacecraft " +messageJson["spacecraft_id"] +" launched")
        this.spacecraftMonitoringService.spacecraftLaunched(messageJson["spacecraft_id"]);
      },
    });
  }

  /*
@MessagePattern("spacecraft-launch")
*/
  async event_spacecraft_damaged_listener(){
    const consumer = this.kafka.consumer({ groupId: 'spacecraft-monitoring-damaged' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-damaged'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let messageJson = JSON.parse(message.value.toLocaleString());
        this.logger.log("Spacecraft " +messageJson["spacecraft_id"] +" damaged")
        this.spacecraftMonitoringService.spacecraftDamaged(messageJson["spacecraft_id"]);
      },
    });
  }

  @Get("/landed")
  @ApiOkResponse()
  async getLandedSpacecraft(): Promise<string[]> {
    this.logger.log("Récuperation des fusées atterrie");
    return this.spacecraftMonitoringService.getLanded();
  }

  @Get("/arriving")
  @ApiOkResponse()
  async getArrivingSpacecraft(): Promise<string[]> {
    this.logger.log("Récuperation des fusées arrivantes");
    return this.spacecraftMonitoringService.getArriving();
  }

  @Get("/launched")
  @ApiOkResponse()
  async getLaunchedSpacecraft(): Promise<string[]> {
    this.logger.log("Récuperation des fusées ayant décollé");
    return this.spacecraftMonitoringService.getLaunched();
  }

  @Get("/crashed")
  @ApiOkResponse()
  async getCrashedSpacecraft(): Promise<string[]> {
    this.logger.log("Récuperation des fusées endommagées");
    return this.spacecraftMonitoringService.getDamaged();
  }

}
