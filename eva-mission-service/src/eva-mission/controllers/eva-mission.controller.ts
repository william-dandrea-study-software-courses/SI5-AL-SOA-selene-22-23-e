import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { EvaMissionService } from "../services/eva-mission.service";
import {EVAMissionDTO} from "../dto/eva-mission.dto";
import {EVAMisionAlreadyExistException} from "../exceptions/eva-mission-already-exist.exception";

@ApiTags("module")
@Controller("")
export class EvaMissionController {
  private readonly logger = new Logger(EvaMissionController.name);

  constructor(private readonly spaceCraftService: EvaMissionService) {}

  @Get("/eva-mission")
  @ApiOkResponse()
  async getModules(): Promise<EVAMissionDTO[]> {
    this.logger.log("Récuperation des vaisseaux");
    return this.spaceCraftService.getEVAMissions();
  }

  @Post("/eva-mission")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: EVAMissionDTO,
  })
  @ApiConflictResponse({
    type: EVAMisionAlreadyExistException,
    description: "SpaceCraft already exists",
  })
  async postModule(@Body() evaMissionDTO: EVAMissionDTO) {
    this.logger.log("Création d'un nouveau vaisseau");
    return this.spaceCraftService.postEVAMission(evaMissionDTO);
  }

  @Put("/eva-mission/:evaMissionId")
  @ApiOkResponse({
    description: "The spaceCraft has been successfully updated.",
    type: EVAMissionDTO,
  })
  async putModule(@Param("evaMissionId") evaId: number, @Body() evaMissionDTO: EVAMissionDTO) {
    this.logger.log("Modification d'un vaisseau");
    return this.spaceCraftService.putEVAMission(evaId, evaMissionDTO);
  }

}
