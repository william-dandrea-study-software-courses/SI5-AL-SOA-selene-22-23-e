import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { EVAMission, EVAMissionDocument } from "../schemas/eva-mission.schema";

import { EVAMissionDTO } from "../dto/eva-mission.dto";
import { EVAMisionAlreadyExistException } from "../exceptions/eva-mission-already-exist.exception";
import { Kafka } from "kafkajs";
import { EvaMissionController } from "../controllers/eva-mission.controller";
import { SpacesuitMetrics } from "../schemas/spacesuit-metrics.schema";
import { SpacesuitMetricsDTO } from "../dto/spacesuit-metrics.dto";

@Injectable()
export class EvaMissionService {
  private readonly logger = new Logger(EvaMissionController.name);

  private kafka = new Kafka({
    clientId: "eva-mission",
    brokers: ["kafka-service:9092"],
  });

  constructor(
    @InjectModel(EVAMission.name)
    private evaMissionModel: Model<EVAMissionDocument>
  ) {}

  async getEVAMissions(): Promise<EVAMissionDTO[]> {
    return this.evaMissionModel.find().then((evaMissions) => {
      const response: EVAMissionDTO[] = [];
      evaMissions.forEach((evaMission) => {
        const dto = new EVAMissionDTO();
        dto.id_mission = evaMission.id_mission;
        dto.type = evaMission.type;
        dto.date_begin = new Date(evaMission.date_begin);
        dto.date_end = new Date(evaMission.date_end);
        dto.supervisor = evaMission.supervisor;
        dto.notes = evaMission.notes;
        dto.metrics = evaMission.metrics;
        response.push(dto);
      });
      return response;
    });
  }

  async postEVAMission(evaMissionDTO: EVAMissionDTO): Promise<EVAMissionDTO> {
    const alreadyExists = await this.evaMissionModel.find({
      id_mission: evaMissionDTO.id_mission,
    });
    if (alreadyExists.length > 0) {
      throw new EVAMisionAlreadyExistException(evaMissionDTO.id_mission);
    }
    return await this.evaMissionModel
      .create(evaMissionDTO)
      .then((value) => value)
      .catch((error) => null);
  }

  async putEVAMission(
    evaMissionId: number,
    evaMissionDTO: EVAMissionDTO
  ): Promise<EVAMissionDTO> {
    const evaMission = await this.evaMissionModel.findOne({
      id_mission: evaMissionId,
    });
    if (evaMission === null) {
      throw new HttpException("EVA mission not found", HttpStatus.NOT_FOUND);
    }
    evaMission.date_begin = evaMissionDTO.date_begin.toISOString();
    evaMission.date_end =
      evaMissionDTO.date_end === null
        ? null
        : new Date(evaMissionDTO.date_end).toISOString();
    evaMission.supervisor = evaMissionDTO.supervisor;
    evaMission.notes = evaMissionDTO.notes;
    evaMission.metrics = evaMissionDTO.metrics;
    return await evaMission
      .save()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return null;
      });
  }

  async getPastEVAMissionsMetrics(): Promise<SpacesuitMetrics[]> {
    return this.evaMissionModel.find().then((evaMissions) => {
      const response: SpacesuitMetrics[] = [];
      evaMissions.forEach((evaMission) => {
        const dto = new EVAMissionDTO();
        dto.id_mission = evaMission.id_mission;
        dto.type = evaMission.type;
        dto.date_begin = new Date(evaMission.date_begin);
        dto.date_end =
          evaMission.date_end === null ? null : new Date(evaMission.date_end);
        dto.status = evaMission.status;
        dto.supervisor = evaMission.supervisor;
        dto.notes = evaMission.notes;
        dto.metrics = evaMission.metrics;

        if (
          dto.date_end !== null &&
          dto.date_end.getDate() < new Date().getDate()
        ) {
          dto.metrics.forEach((spacesuit) => {
            const spacesuitMetrics = new SpacesuitMetricsDTO();
            spacesuitMetrics.id_spacesuit = spacesuit.id_spacesuit;
            spacesuitMetrics.o2_rate = spacesuit.o2_rate;
            spacesuitMetrics.temperature = spacesuit.temperature;
            spacesuitMetrics.pressure = spacesuit.pressure;
            spacesuitMetrics.power = spacesuit.power;
            response.push(spacesuitMetrics);
          });
        }
      });
      return response;
    });
  }

  async updateMetric(
    id_spacesuit: number,
    cardiac_rythm: number,
    pressure: number,
    o2_rate: number,
    temperature: number,
    power: number
  ) {
    const eva_missions = await this.evaMissionModel.find();
    eva_missions.forEach((eva_mission) => {
      eva_mission.metrics.forEach((metric) => {
        if (metric.id_spacesuit == id_spacesuit) {
          this.logger.log(
            "Update metrics for eva_mission " + eva_mission.id_mission
          );
          metric.power.push(power);
          metric.o2_rate.push(o2_rate);
          metric.pressure.push(pressure);
          metric.temperature.push(temperature);
        }
      });
      eva_mission.save();
    });
  }
}
