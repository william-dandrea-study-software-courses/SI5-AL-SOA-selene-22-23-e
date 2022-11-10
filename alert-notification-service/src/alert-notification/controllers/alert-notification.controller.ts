import {Body, Controller, Get, Logger, OnModuleDestroy, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AlertNotificationService } from "../services/alert-notification.service";
import {AlertDto} from "../dto/alert.dto";
import { Kafka } from "kafkajs";

@ApiTags("module")
@Controller("")
export class AlertNotificationController implements OnModuleDestroy {
  private readonly logger = new Logger(AlertNotificationController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  private moonBaseKafkaConsumer = this.kafka.consumer({groupId: 'moon-base-service-consumer'});
  private meteoriteMonitoringKafkaConsumer = this.kafka.consumer({groupId: 'meteorite-monitoring-service-consumer'});
  private spacecraftKafkaConsumer = this.kafka.consumer({groupId: 'spacecraft-service-consumer'});
  private spacesuitMonitoringKafkaConsumer = this.kafka.consumer({groupId: 'spacesuit-monitoring-service-consumer'});
  private astronautKafkaConsumer = this.kafka.consumer({groupId: 'astronaut-service-consumer'});

  constructor(private readonly spaceCraftService: AlertNotificationService) {
    this.moonBaseKafkaConsumerEventListener();
    this.meteoriteMonitoringKafkaConsumerEventListener();
    this.spacecraftKafkaConsumerEventListener();
    this.spacesuitMonitoringKafkaConsumerEventListener();
    this.astronautKafkaConsumerEventListener();
  }


  @Get("/alerts")
  @ApiOkResponse()
  async getAlerts(): Promise<AlertDto[]> {
    this.logger.log("Récuperation des alertes");
    return this.spaceCraftService.getAlerts();
  }

  @Post("/alerts")
  @ApiCreatedResponse({
    description: "The alert has been successfully added.",
    type: AlertDto,
  })
  async postModule(@Body() alertDto: AlertDto) {
    this.logger.log("Création d'une nouvelle alerte");
    return this.spaceCraftService.postAlert(alertDto);
  }

  @Post("/test-kafka")
  @ApiCreatedResponse({
    description: "The alert event has been successfully dispatch.",
  })
  async postEvent() {
    this.logger.log("Création d'une nouvelle alerte");
    return this.spaceCraftService.testKafka();
  }

  public async eventsListener() {
    const consumer = this.kafka.consumer({groupId: 'survival-control-consumer'});
    // Consuming
    await consumer.connect()
    await consumer.subscribe({topic: 'problem-spacesuit'})

    await consumer.run({
      eachMessage: async ({topic, partition, message}) => {
        this.logger.log("Spacesuit problem detected value: " + message.value.toLocaleString())
        this.logger.log("Spacesuit id : " + JSON.parse(message.value.toLocaleString())["spacesuit_id"])
        // this.spacesuit_problems.add(JSON.parse(message.value.toLocaleString())["spacesuit_id"])
      },
    });
  }

  public async moonBaseKafkaConsumerEventListener() {
    // await this.moonBaseKafkaConsumer.connect();
  }
  public async meteoriteMonitoringKafkaConsumerEventListener() {
    // await this.meteoriteMonitoringKafkaConsumer.connect();
  }
  public async spacecraftKafkaConsumerEventListener() {
    // await this.spacecraftKafkaConsumer.connect();
  }
  public async spacesuitMonitoringKafkaConsumerEventListener() {
    // await this.spacesuitMonitoringKafkaConsumer.connect();
  }
  public async astronautKafkaConsumerEventListener() {
    // await this.astronautKafkaConsumer.connect();
  }



  async onModuleDestroy() {
    // await this.moonBaseKafkaConsumer.disconnect();
    // await this.meteoriteMonitoringKafkaConsumer.disconnect();
    // await this.spacecraftKafkaConsumer.disconnect();
    // await this.spacesuitMonitoringKafkaConsumer.disconnect();
    // await this.astronautKafkaConsumer.disconnect();
  }


}
