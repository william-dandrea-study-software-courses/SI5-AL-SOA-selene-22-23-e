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

import { EvaMissionService } from "../services/eva-mission.service";
import { EVAMissionDTO } from "../dto/eva-mission.dto";
import { EVAMisionAlreadyExistException } from "../exceptions/eva-mission-already-exist.exception";
import { SpacesuitMetricsDTO } from "../dto/spacesuit-metrics.dto";

@ApiTags("eva-mission")
@Controller("eva-mission")
export class EvaMissionController {
  private readonly logger = new Logger(EvaMissionController.name);

  constructor(private readonly evaMissionService: EvaMissionService) {}

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
  async postEVAMissions(@Body() evaMissionDTO: EVAMissionDTO) {
    this.logger.log("Création d'un nouveau vaisseau");
    return this.evaMissionService.postEVAMission(evaMissionDTO);
  }

  @Put("/:evaMissionId")
  @ApiOkResponse({
    description: "The spaceCraft has been successfully updated.",
    type: EVAMissionDTO,
  })
  async putEVAMissions(
    @Param("evaMissionId") evaId: number,
    @Body() evaMissionDTO: EVAMissionDTO
  ) {
    this.logger.log("Modification d'un vaisseau");
    return this.evaMissionService.putEVAMission(evaId, evaMissionDTO);
  }

  @Get("/metrics")
  @ApiOkResponse()
  async getPastEVAMissionsMetrics(): Promise<SpacesuitMetricsDTO[]> {
    this.logger.log(
      "Récuperation des métriques des combinaisons pour les EVA missions terminées"
    );
    return this.evaMissionService.getPastEVAMissionsMetrics();
  }

  // =============================================================================================================== //
  @Get("/testKafkaEmit")
  async testKafka(): Promise<any> {
    return this.evaMissionService.testKafka();
  }

  @Get("/testKafkaReceive")
  async testKafkaReceive(): Promise<any> {
    return this.evaMissionService.receiveKafka();
  }
}
