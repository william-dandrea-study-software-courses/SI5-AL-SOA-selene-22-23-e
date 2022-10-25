import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Kafka} from "kafkajs"
import {Spacesuit, SpacesuitDocument} from '../schemas/spacesuit.schema';

import {SpacesuitCreationDTO, SpacesuitDTO} from "../dto/spacesuit.dto";
import {SpacesuitAlreadyExistException} from "../exceptions/spacesuit-already-exist.exception";
import {SpacesuitVitals} from "../schemas/spacesuit-vitals.schema";

@Injectable()
export class SpacesuitService {
  private readonly logger = new Logger(SpacesuitService.name);


  private kafka = new Kafka({
    clientId: 'spacecraft',
    brokers: ['kafka-service:9092']
  })

  constructor(@InjectModel(Spacesuit.name) private spacesuitModel: Model<SpacesuitDocument>) {}

  async getSpacesuits(): Promise<SpacesuitDTO[]> {
    return this.spacesuitModel.find().then(spacesuits => {
      let response : SpacesuitDTO[]=[];
      spacesuits.forEach(spacesuit => {
        let dto = new SpacesuitDTO();
        dto.id_spacesuit = spacesuit.id_spacesuit;
        dto.current_vitals = spacesuit.current_vitals;
        response.push(dto);
      })
      return response;
    });
  }

  async getSpacesuit(spacesuitId: number): Promise<SpacesuitDTO> {
    const spacesuit = await this.spacesuitModel.findOne({ id_spacecraft: spacesuitId });
    if(spacesuit === null) {
      throw new HttpException("spaceCraft not found",HttpStatus.NOT_FOUND,);
    }
    let dto = new SpacesuitDTO();
    dto.id_spacesuit = spacesuit.id_spacesuit;
    dto.current_vitals = spacesuit.current_vitals;
    return dto;
  }

  async postSpacesuit(spacesuitDTO: SpacesuitDTO): Promise<SpacesuitDTO> {
    const alreadyExists = await this.spacesuitModel.find({ id_spacesuit: spacesuitDTO.id_spacesuit });
    if (alreadyExists.length > 0) {
      throw new SpacesuitAlreadyExistException(spacesuitDTO.id_spacesuit);
    }
    return await this.spacesuitModel.create(spacesuitDTO);
  }

  async createSpacesuit(spacesuitCreationDTO: SpacesuitCreationDTO): Promise<Spacesuit> {
    const alreadyExists = await this.spacesuitModel.find({
      id_spacesuit: spacesuitCreationDTO.id_spacesuit,
    });
    if (alreadyExists.length > 0) {
      throw new SpacesuitAlreadyExistException(spacesuitCreationDTO.id_spacesuit);
    }

    const newSpaceSuit: Spacesuit = {
      id_spacesuit: spacesuitCreationDTO.id_spacesuit,
      id_astronaut: null,
      current_vitals: null,
    }

    return await this.spacesuitModel.create(newSpaceSuit);
  }

  async affectAstronautToSpacesuit(spacesuitId: number, id_astronaut: number) {
    const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: spacesuitId}).exec();
    if (spacesuit === null) {
      throw new HttpException(`Any spacesuit with ID ${spacesuitId} found, please create the spacesuit before`, 404)
    }

    spacesuit.id_astronaut = id_astronaut;
    spacesuit.current_vitals = {
      cardiac_rythm: 60,
      o2_rate: 100,
      temperature: 25,
      pressure: 1,
      power: 100
    }
    return await spacesuit.save();
  }

  async removeAstronautFromSpacesuit(spacesuitId: number) {
    const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: spacesuitId}).exec();
    if (spacesuit === null) {
      throw new HttpException(`Any spacesuit with ID ${spacesuitId} found, please create the spacesuit before`, 404)
    }

    spacesuit.id_astronaut = null;
    return await spacesuit.save();
  }

  async putSpacesuit(spacesuitDTO: SpacesuitDTO, id_spacesuit: number): Promise<Spacesuit>{
    let spacesuit = await this.spacesuitModel.findOne({ id_spacesuit: id_spacesuit });
    if (spacesuit === null) {
      throw new HttpException(`Any spacesuit with ID ${id_spacesuit} found, please create the spacesuit before`, 404)
    }
    spacesuit.id_astronaut = spacesuitDTO.id_astronaut;
    spacesuit.current_vitals = spacesuitDTO.current_vitals;
    spacesuit.save();
    return spacesuit;
  }

  async updateVitals(spacesuitId: number, vitals: SpacesuitVitals) {
    const spacesuit = await this.spacesuitModel.findOne({id_spacesuit: spacesuitId}).exec();
    if (spacesuit === null) {
      throw new HttpException(`Any spacesuit with ID ${spacesuitId} found, please create the spacesuit before`, 404)
    }

    spacesuit.current_vitals = vitals;
    return await spacesuit.save();
  }

  async sendSpacesuitVitals(): Promise<void>{
    const producer = await this.kafka.producer()

    let spacesuits = await this.spacesuitModel.find();
    let message: { value: string }[] = [];
    spacesuits.forEach(spacesuit => {
      if(spacesuit.id_astronaut !== null) {
        message.push({value: '{"cardiac_rythm" :' + spacesuit.current_vitals.cardiac_rythm + ',"pressure" :' + spacesuit.current_vitals.pressure + ',"o2_rate" :' + spacesuit.current_vitals.o2_rate + ',"temperature" :' + spacesuit.current_vitals.temperature + ',"power" :' + spacesuit.current_vitals.power + ',"astronaut_id" :' + spacesuit.id_astronaut + ',"spacesuit_id":' + spacesuit.id_spacesuit + '}'})
      }
    })
    // Producing
    await producer.connect()
    this.logger.log('Sending combinaison vitals')


    await producer.send({
      topic: 'spacesuit-vitals',
      messages: message,
    });
    await producer.disconnect();
  }

  async sendMessageToBus(topic: string, key: string, message: any) {
    const producer = await this.kafka.producer();

    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          key: key,
          value: JSON.stringify(message),
        },
      ],
    });
    await producer.disconnect();
  }

}