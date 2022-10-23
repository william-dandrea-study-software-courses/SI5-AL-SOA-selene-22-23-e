import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Kafka } from "kafkajs"
import {SpacesuitService} from "../services/spacesuit.service";
import {SpacesuitDTO} from "../dto/spacesuit.dto";
import {
  SpacesuitAlreadyExistException
} from "../exceptions/spacesuit-already-exist.exception";
import {Spacesuit} from "../schemas/spacesuit.schema";

@ApiTags("spacesuit")
@Controller("")
export class SpacesuitController {
  private readonly logger = new Logger(SpacesuitController.name);

  constructor(private readonly spacesuitService: SpacesuitService) {
    this.testBoucle();
  }

  @Get("/spacesuit")
  @ApiOkResponse()
  async getSuits(): Promise<SpacesuitDTO[]> {
    this.logger.log("Récuperation des combinaisons");
    return this.spacesuitService.getSpacesuits();
  }

  @Post("/spacesuit")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: SpacesuitDTO,
  })
  @ApiConflictResponse({
    type: SpacesuitAlreadyExistException,
    description: "Spacesuit already exists",
  })
  async postSuit(@Body() spacesuitDTO: SpacesuitDTO) {
    this.logger.log("Création d'une nouvelle combinaison");
    return this.spacesuitService.postSpacesuit(spacesuitDTO);
  }

  @Get("/spacesuit/:spacesuitId")
  @ApiOkResponse()
  async getSuit(@Param("spacesuitId") spacesuitId: number) {
    this.logger.log("Recuperation d'une combinaison");
    return this.spacesuitService.getSpacesuit(spacesuitId);
  }

  @Put("/spacesuit/:spacesuitId")
  @ApiOkResponse({
    description: "The spacesuit has been successfully updated.",
    type: Spacesuit,
  })
  async putSpacesuit(@Param("spacesuitId") spacesuitId: number, @Body() spacesuitDTO: SpacesuitDTO) {
    this.logger.log("Modification d'une combinaison");
    return this.spacesuitService.putSpacesuit(spacesuitDTO,spacesuitId);
  }

  async testBoucle(){
    while(1){
      await this.sleep(1000);
      await this.spacesuitService.sendSpacesuitVitals();
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
