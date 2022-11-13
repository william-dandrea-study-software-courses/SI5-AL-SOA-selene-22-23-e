import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import {Kafka} from "kafkajs";

import { EvaMissionService } from "../services/eva-mission.service";
import { EVAMissionDTO } from "../dto/eva-mission.dto";
import { EVAMisionAlreadyExistException } from "../exceptions/eva-mission-already-exist.exception";
import { SpacesuitMetricsDTO } from "../dto/spacesuit-metrics.dto";
import {SpacesuitMetrics} from "../schemas/spacesuit-metrics.schema";
import {EvaMissionInDTO} from "../dto/eva-mission-in.dto";

@ApiTags("eva-mission")
@Controller("eva-mission")
export class EvaMissionController {
  private readonly logger = new Logger(EvaMissionController.name);

  private kafka = new Kafka({
    clientId: "eva-mission",
    brokers: ["kafka-service:9092"],
  });

  constructor(private readonly evaMissionService: EvaMissionService) {
    this.event_spacesuit_vitals_listener();
  }

  @Get("")
  @ApiOkResponse()
  async getEVAMissions(): Promise<EVAMissionDTO[]> {
    this.logger.log("Récuperation des vaisseaux");
    return this.evaMissionService.getEVAMissions();
  }

  @Post("")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: EVAMissionDTO,
  })
  @ApiConflictResponse({
    type: EVAMisionAlreadyExistException,
    description: "SpaceCraft already exists",
  })
  async postEVAMissions(@Body() evaMissionDTO: EvaMissionInDTO) {
    this.logger.log("Création d'un nouveau vaisseau");
    return this.evaMissionService.postEVAMission(EVAMissionDTO.evaMissionInToDto(evaMissionDTO));
  }

  @Put("/:evaMissionId")
  @ApiOkResponse({
    description: "The eva mission has been successfully updated.",
    type: EVAMissionDTO,
  })
  async putEVAMissions(
    @Param("evaMissionId") evaId: number,
    @Body() evaMissionDTO: EvaMissionInDTO
  ) {
    this.logger.log("Modification d'une eva mission");
    return this.evaMissionService.putEVAMission(evaId, EVAMissionDTO.evaMissionInToDto(evaMissionDTO));
  }

  @Get("/metrics")
  @ApiOkResponse()
  async getPastEVAMissionsMetrics(): Promise<SpacesuitMetricsDTO[]> {
    this.logger.log(
      "Récuperation des métriques des combinaisons pour les EVA missions terminées"
    );
    return this.evaMissionService.getPastEVAMissionsMetrics();
  }

  @Get("/:evaMissionId/metrics")
  @ApiOkResponse()
  async getEVAMissionsMetrics(@Param("evaMissionId") evaId: number): Promise<SpacesuitMetrics[]> {
    this.logger.log(
        "Récuperation des métriques des combinaisons pour l'EVA mission" + evaId
    );
    return this.evaMissionService.getEVAMissionMetrics(evaId);
  }

  async event_spacesuit_vitals_listener(){
    const consumer = this.kafka.consumer({ groupId: 'eva-mission-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'spacesuit-vitals'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Spacesuit update value: " + message.value.toLocaleString())
        let json = JSON.parse(message.value.toLocaleString());
        this.logger.log(json)
        await this.evaMissionService.updateMetric(json['spacesuit_id'], json['cardiac_rythm'],json['pressure'],json['o2_rate'],json['temperature'],json['power']);
      },
    });
  }
}
