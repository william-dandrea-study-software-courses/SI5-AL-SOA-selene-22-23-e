import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import {EVAMission, EVAMissionDocument} from '../schemas/eva-mission.schema';

import {EVAMissionDTO} from "../dto/eva-mission.dto";
import {EVAMisionAlreadyExistException} from "../exceptions/eva-mission-already-exist.exception";
import {Kafka} from "kafkajs";
import {EvaMissionController} from "../controllers/eva-mission.controller";

@Injectable()
export class EvaMissionService {

  private readonly logger = new Logger(EvaMissionController.name);

  private kafka = new Kafka({
    clientId: 'eva-mission',
    brokers: ['kafka-service:9092']
  })

  constructor(@InjectModel(EVAMission.name) private evaMissionModel: Model<EVAMissionDocument>) {

  }

  async getEVAMissions(): Promise<EVAMissionDTO[]> {
    return this.evaMissionModel.find().then(evaMissions => {
      let response : EVAMissionDTO[]=[];
      evaMissions.forEach(evaMission => {
        let dto = new EVAMissionDTO();
        dto.id_mission = evaMission.id_mission;
        dto.date_begin = evaMission.date_begin;
        dto.date_end = evaMission.date_end;
        dto.status = evaMission.status;
        dto.supervisor = evaMission.supervisor;
        dto.notes = evaMission.notes;
        response.push(dto);
      })
      return response;
    });
  }

  async postEVAMission(evaMissionDTO: EVAMissionDTO): Promise<EVAMissionDTO> {
    const alreadyExists = await this.evaMissionModel.find({ id_mission: evaMissionDTO.id_mission });
    if (alreadyExists.length > 0) {
      throw new EVAMisionAlreadyExistException(evaMissionDTO.id_mission);
    }
    return await this.evaMissionModel.create(evaMissionDTO);
  }

  async putEVAMission(evaMissionId: number, evaMissionDTO: EVAMissionDTO): Promise<EVAMissionDTO> {
    let evaMission = await this.evaMissionModel.findOne({ id_mission: evaMissionId });
    if(evaMission === null) {
      throw new HttpException("spaceCraft not found",HttpStatus.NOT_FOUND,);
    }
    evaMission.date_begin = evaMissionDTO.date_begin;
    evaMission.date_end = evaMissionDTO.date_end;
    evaMission.status = evaMissionDTO.status;
    evaMission.supervisor = evaMissionDTO.supervisor;
    evaMission.notes = evaMissionDTO.notes;
    evaMission.save();
    return evaMission;
  }


  public async testKafka(): Promise<any> {

    const producer = await this.kafka.producer()



    // Producing
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    });

    await producer.disconnect();

    return null;
  }


  public async receiveKafka() {
    const consumer = await this.kafka.consumer({ groupId: 'test-group' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    });

    // Tant que lui n'est pas disconnect, il continuera a lire
  }

}
