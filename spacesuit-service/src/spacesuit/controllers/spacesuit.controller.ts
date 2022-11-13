import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import {SpacesuitService} from "../services/spacesuit.service";
import {AffectAstronautDTO, SpacesuitCreationDTO, SpacesuitDTO} from "../dto/spacesuit.dto";
import { SpacesuitAlreadyExistException } from "../exceptions/spacesuit-already-exist.exception";
import {SpacesuitVitals} from "../schemas/spacesuit-vitals.schema";

@ApiTags("spacesuit")
@Controller("/spacesuit")
export class SpacesuitController {
  private readonly logger = new Logger(SpacesuitController.name);

  constructor(private readonly spacesuitService: SpacesuitService) {
    this.testBoucle();
  }

  @Get("")
  @ApiOkResponse()
  async getSuits(): Promise<SpacesuitDTO[]> {
    this.logger.log("Récuperation des combinaisons");
    return this.spacesuitService.getSpacesuits();
  }

  @Post("/old")
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

  @Get("/:spacesuitId")
  @ApiOkResponse()
  async getSuit(@Param("spacesuitId") spacesuitId: number) {
    this.logger.log("Recuperation d'une combinaison");
    return this.spacesuitService.getSpacesuit(spacesuitId);
  }


  @Post("")
  @ApiCreatedResponse({description: "The spacesuit has been successfully added.", type: SpacesuitDTO,})
  @ApiConflictResponse({type: SpacesuitAlreadyExistException, description: "Spacesuit already exists",})
  async createSpaceSuit(@Body() spacesuitDTO: SpacesuitCreationDTO) {
    this.logger.log("Création d'une nouvelle combinaison");
    return this.spacesuitService.createSpacesuit(spacesuitDTO);
  }

  @Put("/:spacesuitId/affect-astronaut")
  async affectAstronautToSpacesuit(@Param("spacesuitId") spacesuitId: number, @Body() body: AffectAstronautDTO) {
    this.logger.log(`Affect astronaut ${body.id_astronaut} to space-suit ${spacesuitId}`)
    return await this.spacesuitService.affectAstronautToSpacesuit(spacesuitId, body.id_astronaut);
  }

  @Put("/:spacesuitId/remove-astronaut")
  async removeAstronautFromSpacesuit(@Param("spacesuitId") spacesuitId: number) {
    this.logger.log(`Remove astronaut from space-suit ${spacesuitId}`)
    return await this.spacesuitService.removeAstronautFromSpacesuit(spacesuitId);
  }

  @Post("/:spacesuitId/update-vitals")
  async updateVitals(@Param("spacesuitId") spacesuitId: number, @Body() vitals: SpacesuitVitals) {
    this.logger.log(`Update the vitals of the spacesuit  ${spacesuitId}`);
    return await this.spacesuitService.updateVitals(spacesuitId, vitals)
  }


  /*
  @Put("/:spacesuitId")
  @ApiOkResponse({description: "The spacesuit has been successfully updated.", type: SpacesuitDTO,})
  async editSpacesuit(@Param("spacesuitId") spacesuitId: number, @Body() spacesuitDTO: SpacesuitDTO) {
    this.logger.log("Modification d'une combinaison");
    return this.spacesuitService.putSpacesuit(spacesuitDTO,spacesuitId);
  }*/

  async testBoucle(){
    while(1){
      await this.sleep(200);
      await this.spacesuitService.sendSpacesuitVitals();
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
