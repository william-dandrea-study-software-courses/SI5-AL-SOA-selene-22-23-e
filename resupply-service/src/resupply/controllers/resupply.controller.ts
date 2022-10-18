import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ResupplyService } from "../services/resupply.service";
import { ResupplyMissionDto } from "../dto/resupply-mission.dto";
import { SupplyOrderDTO } from "../dto/supply-order.dto";
import { ResupplyMissionNotExist } from "../exceptions/resupply-mission-not-exist.exception";
import { Kafka } from "kafkajs"

@ApiTags("resupply")
@Controller("/resupply")
export class ResupplyController {
  private readonly logger = new Logger(ResupplyController.name);

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(
    private readonly resupplyService: ResupplyService
  ) {
    this.event_destroyed_listener()
  }



  @ApiOkResponse({ type: Boolean })
  @Post("/supply")
  @HttpCode(200)
  async supply(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any> {
    this.logger.log("Création de la DTO supply");
    return this.resupplyService.resupply(supplyOrderDTO);
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/rocketStatus")
  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    this.logger.log(
      "Récupération du statut des différentes missions de réapprovisionnement"
    );
    return this.resupplyService.retrieveResupplyMissionsStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/supplyOrders")
  async getResupplyOrder(): Promise<any> {
    this.logger.log("Récupération des commandes");
    return this.resupplyService.getResupplyOrder();
  }

  @ApiOkResponse({ type: Boolean })
  @Put("/:supplyOrderId/validate")
  @HttpCode(200)
  async validate(@Param("supplyOrderId") supplyOrder: string): Promise<any> {
    this.logger.log("Validation d'une commande");
    return this.resupplyService.validateOrder(supplyOrder);
  }

  @ApiOkResponse({ type: Boolean })
  @Put("/:resupplyMissionId/send")
  @ApiConflictResponse({
    type: ResupplyMissionNotExist,
    description: "Resupply mission does not exist",
  })
  @HttpCode(200)
  async send(
    @Param("resupplyMissionId") resupplyMissionId: string
  ): Promise<any> {
    this.logger.log("Envoie d'une fusée");
    return this.resupplyService.send(resupplyMissionId);
  }

  async event_destroyed_listener(){
    const consumer = await this.kafka.consumer({ groupId: 'spacecraft-event' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-destroyed', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacecraft has been destroyed")
        let id = message.value.toLocaleString()
        await this.resupplyService.spacecrafthasbeendestroyed(id)
      },
    });
  }
}
