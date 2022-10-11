import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { SpaceCraftService } from "../services/space-craft.service";
import {SpaceCraftDTO} from "../dto/space-craft.dto";
import {SpaceCraftAlreadyExistException} from "../exceptions/space-craft-already-exist.exception";

@ApiTags("module-supervision")
@Controller("")
export class SpaceCraftController {
  private readonly logger = new Logger(SpaceCraftController.name);

  constructor(private readonly spaceCraftService: SpaceCraftService) {}

  @Get("/spacecraft")
  @ApiOkResponse()
  async getModules(): Promise<SpaceCraftDTO[]> {
    this.logger.log("Récuperation des vaisseaux");
    return this.spaceCraftService.getSpaceCraft();
  }

  @Post("/spacecraft")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: SpaceCraftDTO,
  })
  @ApiConflictResponse({
    type: SpaceCraftAlreadyExistException,
    description: "SpaceCraft already exists",
  })
  async postModule(@Body() spaceCraftDTO: SpaceCraftDTO) {
    this.logger.log("Création d'un nouveau vaisseau");
    return this.spaceCraftService.postSpaceCraft(spaceCraftDTO);
  }

  @Put("/spacecraft/:spacecraftId")
  @ApiOkResponse({
    description: "The spaceCraft has been successfully updated.",
    type: SpaceCraftDTO,
  })
  async putModule(@Param("spacecraftId") spaceCraftId: number, @Body() spaceCraftDTO: SpaceCraftDTO) {
    this.logger.log("Modification d'un vaisseau");
    return this.spaceCraftService.putSpaceCraft(spaceCraftId, spaceCraftDTO);
  }

  @Put("/spacecraft/:spacecraftId/launch")
  @ApiOkResponse({
    description: "The spaceCraft has been successfully updated.",
    type: SpaceCraftDTO,
  })
  async launch(@Param("spacecraftId") spaceCraftId: number) {
    this.logger.log("Lancement d'un vaisseau");
    return this.spaceCraftService.launch(spaceCraftId);
  }

}
