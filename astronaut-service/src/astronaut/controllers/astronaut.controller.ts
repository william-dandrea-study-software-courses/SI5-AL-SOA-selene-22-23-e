import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AstronautService } from "../services/astronaut.service";
import {AstronautDto} from "../dto/astronaut.dto";
import {AstronautAlreadyExistsException} from "../exceptions/astronaut-already-exists.exception";

@ApiTags("astronaut")
@Controller("")
export class AstronautController {
  private readonly logger = new Logger(AstronautController.name);

  constructor(private readonly astronautService: AstronautService) {}

  @Get("/astronaut")
  @ApiOkResponse()
  async getAstronauts(): Promise<AstronautDto[]> {
    this.logger.log("Récuperation des astronautes");
    return this.astronautService.getAstronauts();
  }

  @Post("/astronaut")
  @ApiCreatedResponse({
    description: "The astronaut has been successfully added.",
    type: AstronautDto,
  })
  @ApiConflictResponse({
    type: AstronautAlreadyExistsException,
    description: "Astronaut already exists",
  })
  async postModule(@Body() astronautDTO: AstronautDto) {
    this.logger.log("Création d'un nouvel astronaute");
    return this.astronautService.postAstronaut(astronautDTO);
  }

  @Put("/astronaut/:astronautId")
  @ApiOkResponse({
    description: "The astronaut has been successfully updated.",
    type: AstronautDto,
  })
  async putModule(@Param("astronautId") astronautId: number, @Body() astronautDto: AstronautDto) {
    this.logger.log("Modification d'un vaisseau");
    return this.astronautService.putAstronaut(astronautId, astronautDto);
  }

  @Get('/onMoonAstronauts')
  async getOnMoonAstronauts(): Promise<AstronautDto[]> {
    return this.astronautService.getOnMoonAstronauts();
  }

  @Get('/onEarthAstronauts')
  async getOnEarthAstronauts(): Promise<AstronautDto[]> {
    return this.astronautService.getOnEarthAstronauts();
  }

}
