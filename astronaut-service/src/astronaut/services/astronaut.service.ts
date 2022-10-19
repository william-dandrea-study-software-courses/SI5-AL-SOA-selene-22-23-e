import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { firstValueFrom } from "rxjs";

import { Kafka } from "kafkajs";
import { HttpService } from "@nestjs/axios";
import { AxiosError, AxiosResponse } from "axios";
import { AstronautDto } from "../dto/astronaut.dto";
import { AstronautPlanetEnumSchema } from "../schemas/astronaut-planet-enum.schema";
import {AstronautAlreadyExistsException} from "../exceptions/astronaut-already-exists.exception";
import {Astronaut, AstronautDocument} from "../schemas/astronaut.schema";

@Injectable()
export class AstronautService {
  private readonly logger = new Logger(AstronautService.name);

  private kafka = new Kafka({
    clientId: "astronaut",
    brokers: ["kafka-service:9092"],
  });

  private _baseUrlResupply: string;

  constructor(
    @InjectModel(Astronaut.name)
    private astronautModel: Model<AstronautDocument>,
    private readonly httpService: HttpService
  ) {
    this._baseUrlResupply =
      "http://" + process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT;
  }

  async getAstronauts(): Promise<AstronautDto[]> {
    return this.astronautModel.find().then((astronauts) => {
      const response: AstronautDto[] = [];
      astronauts.forEach((astronaut) => {
        const dto = new AstronautDto();
        dto.id_astronaut = astronaut.id_astronaut;
        dto.name = astronaut.name;
        dto.job = astronaut.job;
        dto.planet = astronaut.planet;
        response.push(dto);
      });
      return response;
    });
  }

  async postAstronaut(astronautDto: AstronautDto): Promise<AstronautDto> {
    const alreadyExists = await this.astronautModel.find({
      id_astronaut: astronautDto.id_astronaut,
    });
    if (alreadyExists.length > 0) {
      throw new AstronautAlreadyExistsException(astronautDto.id_astronaut);
    }
    if (astronautDto.isDead){
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "astronaut-dead",
        messages: [
          {
            key: "astronaut_id",
            value: astronautDto.id_astronaut.toString(),
          },
        ],
      });
      await producer.disconnect();
    }
    return await this.astronautModel.create(astronautDto);
  }

  async putAstronaut(
    astronautId: number,
    astronautDto: AstronautDto
  ): Promise<AstronautDto> {
    const astronaut = await this.astronautModel.findOne({
      id_astronaut: astronautId,
    });
    if (astronaut === null) {
      throw new HttpException("Astroanut not found", HttpStatus.NOT_FOUND);
    }
    astronaut.name = astronautDto.name;
    astronaut.isDead = astronautDto.isDead;
    astronaut.job = astronautDto.job;
    astronaut.planet = astronautDto.planet;
    if (
      astronautDto.isDead == true
    ) {
      astronaut.isDead = false;
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "astronaut-dead",
        messages: [
          { key: "astronaut_id", value: astronaut.id_astronaut.toString() },
        ],
      });
      await producer.disconnect();
    }
    await astronaut.save();

    return astronaut;
  }

  async getOnMoonAstronauts(): Promise<AstronautDto[]> {
    const astronauts = await this.astronautModel.find({
      planet: AstronautPlanetEnumSchema.MOON,
    });
    return astronauts;
  }

  async getOnEarthAstronauts(): Promise<AstronautDto[]> {
    const astronauts = await this.astronautModel.find({
      planet: AstronautPlanetEnumSchema.EARTH,
    });
    return astronauts;
  }

}
