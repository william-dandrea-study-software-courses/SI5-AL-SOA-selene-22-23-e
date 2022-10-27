import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { firstValueFrom } from "rxjs";
import { SpaceCraft, SpaceCraftDocument } from "../schemas/spacecraft.schema";
import {Kafka} from "kafkajs";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios"
import { SpacecraftDto } from "../dto/spacecraft.dto";
import { SpacecraftAlreadyExistException } from "../exceptions/spacecraft-already-exist.exception";
import { StatusSpacecraftEnumSchema } from "../schemas/status-spacecraft-enum.schema";
import { AxiosResponse } from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import { resupplyMissionConnotBeAssignedException } from "../exceptions/resupply-mission-connot-be-assigned.exception";

@Injectable()
export class SpacecraftService {
  private readonly logger = new Logger(SpacecraftService.name);

  private kafka = new Kafka({
    clientId: "spacecraft",
    brokers: ["kafka-service:9092"],
  });

  private _baseUrlResupply: string;
  private _baseUrlRotation: string;

  constructor(
    @InjectModel(SpaceCraft.name)
    private spaceCraftModel: Model<SpaceCraftDocument>,
    private readonly httpService: HttpService
  ) {
    this._baseUrlResupply =
      "http://" + process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT;
    this._baseUrlRotation =
        "http://" + process.env.ROTATION_MISSION_SERVICE_URL_WITH_PORT;
  }

  async getSpaceCraft(): Promise<SpacecraftDto[]> {
    return this.spaceCraftModel.find().then((spaceCrafts) => {
      const response: SpacecraftDto[] = [];
      spaceCrafts.forEach((spaceCraft) => {
        const dto = new SpacecraftDto();
        dto.id_spacecraft = spaceCraft.id_spacecraft;
        dto.vitals = spaceCraft.vitals;
        dto.status = spaceCraft.status;
        if (spaceCraft.id_resupplyMission) {
          dto.id_resupplyMission = spaceCraft.id_resupplyMission;
        }
        response.push(dto);
      });
      return response;
    });
  }

  async postSpaceCraft(spacecraftDTO: SpacecraftDto): Promise<SpacecraftDto> {
    const alreadyExists = await this.spaceCraftModel.find({
      id_spacecraft: spacecraftDTO.id_spacecraft,
    });
    if (alreadyExists.length > 0) {
      throw new SpacecraftAlreadyExistException(spacecraftDTO.id_spacecraft);
    }
    if (
      spacecraftDTO.vitals == false ||
      spacecraftDTO.status === StatusSpacecraftEnumSchema.DAMAGED
    ) {
      spacecraftDTO.vitals = false;
      spacecraftDTO.status = StatusSpacecraftEnumSchema.DAMAGED;
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "spacecraft-damaged",
        messages: [
          {
            key: "resupply_mission_id",
            value: spacecraftDTO.id_resupplyMission,
          },
        ],
      });
      await producer.disconnect();
    }
    if (spacecraftDTO.status === StatusSpacecraftEnumSchema.ARRIVING_SOON || spacecraftDTO.id_resupplyMission !== null) {
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "spacecraft-arriving",
        messages: [
          {
            value: ""+spacecraftDTO.id_spacecraft,
          },
        ],
      });
      await producer.disconnect();
    }


    if (spacecraftDTO.status === StatusSpacecraftEnumSchema.LANDED || spacecraftDTO.id_resupplyMission !== null) {
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "spacecraft-landed",
        messages: [
          {
            value: ""+spacecraftDTO.id_spacecraft,
          },
        ],
      });
      await producer.disconnect();
    }

    return await this.spaceCraftModel.create(spacecraftDTO);
  }

  async putSpaceCraft(
    spaceCraftId: number,
    spaceCraftDto: SpacecraftDto
  ): Promise<SpacecraftDto> {
    const spaceCraft = await this.spaceCraftModel.findOne({
      id_spacecraft: spaceCraftId,
    });
    if (spaceCraft === null) {
      throw new HttpException("spaceCraft not found", HttpStatus.NOT_FOUND);
    }
    spaceCraft.vitals = spaceCraftDto.vitals;
    spaceCraft.status = spaceCraftDto.status;
    if (spaceCraftDto.id_resupplyMission) {
      spaceCraft.id_resupplyMission = spaceCraftDto.id_resupplyMission;
    }

    if (
      spaceCraftDto.vitals == false ||
      spaceCraftDto.status === StatusSpacecraftEnumSchema.DAMAGED
    ) {
      spaceCraft.vitals = false;
      spaceCraft.status = StatusSpacecraftEnumSchema.DAMAGED;

      const producer = await this.kafka.producer();
      // Producing
      await producer.connect();
      await producer.send({
        topic: "spacecraft-damaged",
        messages: [
          { key: "resupply_mission_id", value: spaceCraft.id_resupplyMission },
        ],
      });
      await producer.disconnect();
    }

    if (spaceCraftDto.status === StatusSpacecraftEnumSchema.ARRIVING_SOON || spaceCraftDto.id_resupplyMission !== null) {
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "spacecraft-arriving",
        messages: [
          {
            value: ""+spaceCraftDto.id_spacecraft,
          },
        ],
      });
      await producer.disconnect();
    }

    if (spaceCraftDto.status === StatusSpacecraftEnumSchema.LANDED || spaceCraftDto.id_resupplyMission !== null) {
      const producer = await this.kafka.producer();

      // Producing
      await producer.connect();
      await producer.send({
        topic: "spacecraft-landed",
        messages: [
          {
            value: ""+spaceCraftDto.id_spacecraft,
          },
        ],
      });
      await producer.disconnect();
    }

    await spaceCraft.save();

    return spaceCraft;
  }

  async getAvailableSpaceCrafts(): Promise<SpacecraftDto[]> {
    const spaceCrafts = await this.spaceCraftModel.find({
      status: StatusSpacecraftEnumSchema.PREPARING,
    });
    return spaceCrafts;
  }

  async affectSpaceCraftToResupplyMission(
    spacecraft_id: string,
    resupplyMissionId: string
  ): Promise<SpacecraftDto> {
    const spaceCrafts = await this.spaceCraftModel.findOne({
      spacecraft_id: spacecraft_id,
      status: StatusSpacecraftEnumSchema.PREPARING,
      id_resupplyMission: "None",
    });

    if (spaceCrafts == null) {
      throw new HttpException("Aucun SpaceCraft n'est disponible pour être envoyé en mission", HttpStatus.CONFLICT);
    }

    try {
      this.logger.log(
        "Send resupply mission at adress : " +
          this._baseUrlResupply +
          "/resupply/" +
          resupplyMissionId +
          "/affectSpacecraft"
      );
      const retrieveModuleStatusResponse: AxiosResponse<any> =
        await firstValueFrom(
          this.httpService.put(
            this._baseUrlResupply +
              "/resupply/" +
              resupplyMissionId +
              "/affectSpacecraft",
            { spacecraft_id: spacecraft_id }
          )
        );
    } catch (exception) {
      this.logger.log("Request failed");
      if (exception instanceof AxiosError) {
        if (exception.response.status === 403) {
          throw new resupplyMissionConnotBeAssignedException(resupplyMissionId);
        } else {
          throw exception;
        }
      }
      throw exception;
    }

    spaceCrafts.id_resupplyMission = resupplyMissionId;
    await spaceCrafts.save();
    return spaceCrafts;
  }

  async affectSpaceCraftToRotationMission(
      spacecraft_id: string,
      rotationMissionId: string
  ): Promise<SpacecraftDto> {
    const spaceCrafts = await this.spaceCraftModel.findOne({
      spacecraft_id: spacecraft_id,
    });

    if (spaceCrafts == null) {
      throw new HttpException(
          "Aucun SpaceCraft n'est disponible pour être envoyé en mission",
          HttpStatus.CONFLICT
      );
    }

    try {
      this.logger.log(
          "Send resupply mission at adress : " +
          this._baseUrlRotation +
          "/rotation-mission/" +
          rotationMissionId +
          "/affectSpacecraft"
      );
      const retrieveModuleStatusResponse: AxiosResponse<any> =
          await firstValueFrom(
              this.httpService.put(
                  this._baseUrlRotation +
                  "/rotation-mission/" +
                  rotationMissionId +
                  "/affectSpacecraft",
                  { spacecraft_id: spacecraft_id }
              )
          );
    } catch (exception) {
      this.logger.log("Request failed");
      if (exception instanceof AxiosError) {
        if (exception.response.status === 403) {
          throw new resupplyMissionConnotBeAssignedException(rotationMissionId);
        } else {
          throw exception;
        }
      }
      throw exception;
    }

    spaceCrafts.id_rotationMissions.push(rotationMissionId);
    await spaceCrafts.save();
    return spaceCrafts;
  }

  async launchSpaceCraft(idSpaceCraft: number): Promise<SpacecraftDto> {
    const spaceCrafts = await this.spaceCraftModel.findOne({
      id_spacecraft: idSpaceCraft,
    });

    if (spaceCrafts == null) {
      throw new HttpException(
        "Aucun SpaceCraft ne correspond a votre idSpaceCraft",
        HttpStatus.CONFLICT
      );
    }

    if (spaceCrafts.id_resupplyMission === "None" && spaceCrafts.id_rotationMissions.length===0) {
      throw new HttpException(
        "Vous ne pouvez pas lancer un spacecraft qui n'est associé à aucune mission",
        HttpStatus.CONFLICT
      );
    }
    if (spaceCrafts.status !== StatusSpacecraftEnumSchema.PREPARING) {
      throw new HttpException(
        "Vous ne pouvez pas lancer un spacecraft qui n'est pas en préparation",
        HttpStatus.FORBIDDEN
      );
    }
    spaceCrafts.status = StatusSpacecraftEnumSchema.TRAVELING;
    await spaceCrafts.save();

    const producer = await this.kafka.producer()
    // Producing
    await producer.connect()
    this.logger.log("Send spacecraft-launch event")
    await producer.send({
      topic: 'spacecraft-launch',
      messages: [
        { value:'{ "spacecraft_id":'+spaceCrafts.id_spacecraft+', "resupply_mission_id": "'+ spaceCrafts.id_resupplyMission +'" }'},
      ],
    });
    await producer.disconnect();
    return spaceCrafts;
  }
}
