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
import {Kafka} from "kafkajs";
import {runInThisContext} from "vm";

@ApiTags("astronaut")
@Controller("")
export class AstronautController {
  private readonly logger = new Logger(AstronautController.name);

  private kafka = new Kafka({
    clientId: 'astronaut',
    brokers: ['kafka-service:9092']
  })

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
  async postAstronaut(@Body() astronautDTO: AstronautDto) {
    this.logger.log("Création d'un nouvel astronaute");
    return this.astronautService.postAstronaut(astronautDTO);
  }

  @Put("/astronaut/:astronautId")
  @ApiOkResponse({
    description: "The astronaut has been successfully updated.",
    type: AstronautDto,
  })
  async putAstronaut(@Param("astronautId") astronautId: number, @Body() astronautDto: AstronautDto) {
    this.logger.log("Modification d'un astronaut");
    return this.astronautService.putAstronaut(astronautId, astronautDto);
  }

  @Put("/astronaut/:astronautId/secure")
  @ApiOkResponse({
    description: "The astronaut has been successfully secured.",
    type: AstronautDto,
  })
  async secureAstronaut(@Param("astronautId") astronautId: number) {
    this.logger.log("Déplacement d'un astronaute dans le module sécurisé");
    return this.astronautService.secureAstronaut(astronautId);
  }

  @Get('/onMoonAstronauts')
  async getOnMoonAstronauts(): Promise<AstronautDto[]> {
    return this.astronautService.getOnMoonAstronauts();
  }

  @Get('/onEarthAstronauts')
  async getOnEarthAstronauts(): Promise<AstronautDto[]> {
    return this.astronautService.getOnEarthAstronauts();
  }

  /*
  @MessageListener('rotation-failed-damaged')
 */
  async event_rotation_failed_listener(){
    const consumer = this.kafka.consumer({ groupId: 'rotation-mission-consumer-spacecraft-destroyed' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'rotation_failed'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Rotation Mission has failed")
        this.logger.log(message.value.toJSON())
        let astronauts = message.value.toJSON()['astronauts'];
        this.logger.log(astronauts);
        await this.astronautService.rotationMissionHasFailed(astronauts);
      },
    });
  }


}
