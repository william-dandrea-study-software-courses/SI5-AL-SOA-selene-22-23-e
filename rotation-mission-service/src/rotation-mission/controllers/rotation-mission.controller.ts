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
import { RotationMissionService } from "../services/rotation-mission.service";
import { RotationMissionDto } from "../dto/rotation-mission.dto";
import {
  RotationMissionNotExistException
} from "../exceptions/rotation-mission-not-exist.exception";
import { Kafka } from "kafkajs"
import {SpacecraftIdDto} from "../dto/spacecraft-id.dto";
import {SpacecraftDestroyed} from "../dto/event/spacecraft-destroyed";

@ApiTags("/rotation-mission")
@Controller("/rotation-mission")
export class RotationMissionController {
  private readonly logger = new Logger(RotationMissionController.name);

  private kafka = new Kafka({
    clientId: 'rotation-mission',
    brokers: ['kafka-service:9092']
  })

  constructor(
    private readonly rotationMissionService: RotationMissionService
  ) {
    this.event_destroyed_listener()
  }

  @ApiOkResponse({ type: Boolean })
  @Get("")
  async retrieveRotationMission(): Promise<RotationMissionDto[]> {
    this.logger.log(
      "Récupération des différentes missions"
    );
    return await this.rotationMissionService.retrieveRotationMissions();
  }

  @ApiOkResponse({ type: Boolean })
  @Post("")
  @HttpCode(200)
  async supply(@Body() rotationMissionDTO: RotationMissionDto): Promise<any> {
    this.logger.log("Création d'une mission de roulement'");
    return this.rotationMissionService.createMission(rotationMissionDTO);
  }

  @ApiOkResponse({ type: Boolean })
  @Put("/:rotationMissionId/affectSpacecraft")
  @ApiConflictResponse({
    type: RotationMissionNotExistException,
    description: "Rotation mission does not exist",
  })
  @HttpCode(200)
  async affectSpacecraft(@Param("rotationMissionId") rotationMissionId: string, @Body() spacecraftIdDto: SpacecraftIdDto ): Promise<any> {
    this.logger.log("Affect spacecraft to a rotation mission");
    return this.rotationMissionService.affectSpacecraft(rotationMissionId,spacecraftIdDto );
  }

  /*
  @MessageListener('spacecraft-damaged')
   */
  async event_destroyed_listener(){
    const consumer = this.kafka.consumer({ groupId: 'rotation-mission-consumer-spacecraft-destroyed' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacecraft-damaged'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacecraft has been destroyed")
        // let content : SpacecraftDestroyed = message.value.toJSON();
        // await this.rotationMissionService.spacecraft_has_been_destroyed(content)
      }
    });
  }
}
