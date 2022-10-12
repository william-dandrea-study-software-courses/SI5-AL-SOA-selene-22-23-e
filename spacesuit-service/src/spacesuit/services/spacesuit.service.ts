import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import {InjectModel, Prop} from "@nestjs/mongoose";

import {Spacesuit, SpacesuitDocument} from '../schemas/spacesuit.schema';

import { SpacesuitDTO} from "../dto/spacesuit.dto";
import {SpacesuitAlreadyExistException} from "../exceptions/spacesuit-already-exist.exception";

@Injectable()
export class SpacesuitService {

  constructor(@InjectModel(Spacesuit.name) private spacesuitModel: Model<SpacesuitDocument>) {}

  async getSpacesuits(): Promise<SpacesuitDTO[]> {
    return this.spacesuitModel.find().then(spacesuits => {
      let response : SpacesuitDTO[]=[];
      spacesuits.forEach(spacesuit => {
        let dto = new SpacesuitDTO();
        dto.id_spacesuit = spacesuit.id_spacesuit;
        dto.cardiac_rythm = spacesuit.cardiac_rythm;
        dto.o2_rate = spacesuit.o2_rate;
        dto.power = spacesuit.power;
        dto.pressure = spacesuit.pressure;
        dto.temperature = spacesuit.temperature;
        response.push(dto);
      })
      return response;
    });
  }

  async postSpacesuit(spacesuitDTO: SpacesuitDTO): Promise<SpacesuitDTO> {
    const alreadyExists = await this.spacesuitModel.find({ id_spacesuit: spacesuitDTO.id_spacesuit });
    if (alreadyExists.length > 0) {
      throw new SpacesuitAlreadyExistException(spacesuitDTO.id_spacesuit);
    }
    return await this.spacesuitModel.create(spacesuitDTO);
  }

  async putSpacesuit(spacesuitDTO: SpacesuitDTO, id_spacesuit: number): Promise<SpacesuitDTO>{
    let spacesuit = await this.spacesuitModel.findOne({ id_spacesuit: id_spacesuit });
    spacesuit.cardiac_rythm = spacesuitDTO.cardiac_rythm;
    spacesuit.o2_rate = spacesuitDTO.o2_rate;
    spacesuit.temperature = spacesuitDTO.temperature;
    spacesuit.pressure = spacesuitDTO.pressure;
    spacesuit.power = spacesuitDTO.power;

    spacesuit.save();
    return spacesuit;
  }

  async getSpacesuit(spacesuitId: number): Promise<SpacesuitDTO> {
    const spacesuit = await this.spacesuitModel.findOne({ id_spacecraft: spacesuitId });
    if(spacesuit === null) {
      throw new HttpException("spaceCraft not found",HttpStatus.NOT_FOUND,);
    }
    let dto = new SpacesuitDTO();
    dto.id_spacesuit = spacesuit.id_spacesuit;
    dto.cardiac_rythm = spacesuit.cardiac_rythm;
    dto.o2_rate = spacesuit.o2_rate;
    dto.power = spacesuit.power;
    dto.pressure = spacesuit.pressure;
    dto.temperature = spacesuit.temperature;
    return dto;
  }

}