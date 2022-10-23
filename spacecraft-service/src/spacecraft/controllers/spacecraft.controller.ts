import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { SpacecraftService } from "../services/spacecraft.service";
import {SpacecraftDto} from "../dto/spacecraft.dto";
import {SpacecraftAlreadyExistException} from "../exceptions/spacecraft-already-exist.exception";
import {SpacecraftAffectDto} from "../dto/spacecraft_affect.dto";

@ApiTags("module")
@Controller("")
export class SpacecraftController {
  private readonly logger = new Logger(SpacecraftController.name);

  constructor(private readonly spaceCraftService: SpacecraftService) {}

  @Get("/spacecraft")
  @ApiOkResponse()
  async getModules(): Promise<SpacecraftDto[]> {
    this.logger.log("Récuperation des vaisseaux");
    return this.spaceCraftService.getSpaceCraft();
  }

  @Post("/spacecraft")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: SpacecraftDto,
  })
  @ApiConflictResponse({
    type: SpacecraftAlreadyExistException,
    description: "SpaceCraft already exists",
  })
  async postModule(@Body() spaceCraftDTO: SpacecraftDto) {
    this.logger.log("Création d'un nouveau vaisseau");
    return this.spaceCraftService.postSpaceCraft(spaceCraftDTO);
  }

  @Put("/spacecraft/:spacecraftId")
  @ApiOkResponse({
    description: "The spaceCraft has been successfully updated.",
    type: SpacecraftDto,
  })
  async putModule(@Param("spacecraftId") spaceCraftId: number, @Body() spaceCraftDTO: SpacecraftDto) {
    this.logger.log("Modification d'un vaisseau");
    return this.spaceCraftService.putSpaceCraft(spaceCraftId, spaceCraftDTO);
  }

  @Put("/spacecraft/:spacecraftId/launch")
  @ApiOkResponse({
    description: "The spaceCraft has been successfully updated.",
    type: SpacecraftDto,
  })
  async launch(@Param("spacecraftId") spaceCraftId: number) {
    this.logger.log("Lancement d'un vaisseau");
    return this.spaceCraftService.launchSpaceCraft(spaceCraftId)
  }

  @Get('/availableSpaceCrafts')
  async getAvailableSpaceCrafts(): Promise<SpacecraftDto[]> {
    return this.spaceCraftService.getAvailableSpaceCrafts();
  }

  @Put('/spacecraft/:spacecraftId/affectSpaceCraftToResupplyMission/')
  async affectSpaceCraftToResupplyMission(@Param('spacecraftId') spacecraftId: string,@Body() spacecraftAffectDto : SpacecraftAffectDto): Promise<SpacecraftDto> {
    return this.spaceCraftService.affectSpaceCraftToResupplyMission(spacecraftId,spacecraftAffectDto.id_Mission);
  }

  @Put('/spacecraft/:spacecraftId/affectSpaceCraftToRotationMission/')
  async affectSpaceCraftToRotationMission(@Param('spacecraftId') spacecraftId: string,@Body() spacecraftAffectDto : SpacecraftAffectDto): Promise<SpacecraftDto> {
    return this.spaceCraftService.affectSpaceCraftToRotationMission(spacecraftId,spacecraftAffectDto.id_Mission);
  }

}
