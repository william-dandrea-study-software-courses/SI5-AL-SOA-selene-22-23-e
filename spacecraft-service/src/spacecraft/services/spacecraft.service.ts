import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

import {SpaceCraft, SpaceCraftDocument} from '../schemas/spacecraft.schema';
import {Kafka} from "kafkajs";

import {SpacecraftDto} from "../dto/spacecraft.dto";
import {SpacecraftAlreadyExistException} from "../exceptions/spacecraft-already-exist.exception";
import {StatusSpacecraftEnumSchema} from "../schemas/status-spacecraft-enum.schema";

@Injectable()
export class SpacecraftService {

  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(@InjectModel(SpaceCraft.name) private spaceCraftModel: Model<SpaceCraftDocument>) {}

  async getSpaceCraft(): Promise<SpacecraftDto[]> {
    return this.spaceCraftModel.find().then(spaceCrafts => {
      let response : SpacecraftDto[]=[];
      spaceCrafts.forEach(spaceCraft => {
        let dto = new SpacecraftDto();
        dto.id_spacecraft = spaceCraft.id_spacecraft;
        dto.vitals = spaceCraft.vitals;
        dto.status = spaceCraft.status;
        if(spaceCraft.id_resupplyMission){
          dto.id_resupplyMission = spaceCraft.id_resupplyMission;
        }
        response.push(dto);
      })
      return response;
    });
  }

  async postSpaceCraft(spacecraftDTO: SpacecraftDto): Promise<SpacecraftDto> {
    const alreadyExists = await this.spaceCraftModel.find({ id_spacecraft: spacecraftDTO.id_spacecraft });
    if (alreadyExists.length > 0) {
      throw new SpacecraftAlreadyExistException(spacecraftDTO.id_spacecraft);
    }
    if(spacecraftDTO.vitals == false || spacecraftDTO.status === StatusSpacecraftEnumSchema.BROKEN){
      spacecraftDTO.vitals = false;
      spacecraftDTO.status = StatusSpacecraftEnumSchema.BROKEN;
      const producer = await this.kafka.producer()

      // Producing
      await producer.connect()
      await producer.send({
        topic: 'spacecraft-destroyed',
        messages: [
          { value: spacecraftDTO.id_resupplyMission},
        ],
      });
      await producer.disconnect();
    }
    return await this.spaceCraftModel.create(spacecraftDTO);
  }

  async putSpaceCraft(spaceCraftId: number, spaceCraftDto: SpacecraftDto): Promise<SpacecraftDto> {
    const spaceCraft = await this.spaceCraftModel.findOne({ id_spacecraft: spaceCraftId });
    if(spaceCraft === null) {
      throw new HttpException("spaceCraft not found",HttpStatus.NOT_FOUND,);
    }
    spaceCraft.vitals = spaceCraftDto.vitals;
    spaceCraft.status = spaceCraftDto.status;
    if(spaceCraftDto.id_resupplyMission) {
      spaceCraft.id_resupplyMission = spaceCraftDto.id_resupplyMission;
    }
    spaceCraft.save();

    if(spaceCraftDto.vitals == false || spaceCraftDto.status === StatusSpacecraftEnumSchema.BROKEN){
      spaceCraftDto.vitals = false;
      spaceCraftDto.status = StatusSpacecraftEnumSchema.BROKEN;
      const producer = await this.kafka.producer()

      // Producing
      await producer.connect()
      await producer.send({
        topic: 'spacecraft-destroyed',
        messages: [
          { value: spaceCraftDto.id_resupplyMission},
        ],
      });
      await producer.disconnect();
    }
    return spaceCraft;
  }

  async launch(spaceCraftId: number){
    const spaceCraft = await this.spaceCraftModel.findOne({ id_spacecraft: spaceCraftId });
    if(spaceCraft === null) {
      throw new HttpException("spaceCraft not found",HttpStatus.NOT_FOUND,);
    }
    spaceCraft.status = StatusSpacecraftEnumSchema.TRAVELING;
    spaceCraft.save();
    return spaceCraft;

  }

  async getAvailableSpaceCrafts(): Promise<SpacecraftDto[]> {
    const spaceCrafts = await this.spaceCraftModel.find({status: StatusSpacecraftEnumSchema.PREPARING})
    return spaceCrafts;
  }

  async affectSpaceCraftToMission(resupplyMissionId: string): Promise<SpacecraftDto> {
    const spaceCrafts = await this.spaceCraftModel.findOne({status: StatusSpacecraftEnumSchema.PREPARING, id_resupplyMission: "None"})

    if (spaceCrafts == null) {
      throw new HttpException("Aucun SpaceCraft n'est disponible pour être envoye en mission", HttpStatus.CONFLICT);
    }

    spaceCrafts.id_resupplyMission = resupplyMissionId;
    await spaceCrafts.save();

    return spaceCrafts;
  }

  async launchSpaceCraft(idSpaceCraft: number): Promise<SpacecraftDto> {
    const spaceCrafts = await this.spaceCraftModel.findOne({id_spacecraft: idSpaceCraft})

    if (spaceCrafts == null) {
      throw new HttpException("Aucun SpaceCraft ne correspond a votre idSpaceCraft", HttpStatus.CONFLICT);
    }

    if (spaceCrafts.id_resupplyMission === "None") {
      throw new HttpException("Vous ne pouvez pas lancer un spacecraft qui n'est associé à aucune mission", HttpStatus.CONFLICT );
    }

    spaceCrafts.status = StatusSpacecraftEnumSchema.TRAVELING;
    await spaceCrafts.save();

    return spaceCrafts;
  }





}
