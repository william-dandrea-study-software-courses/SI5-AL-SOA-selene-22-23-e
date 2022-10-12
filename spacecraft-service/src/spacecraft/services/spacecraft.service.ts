import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import {SpaceCraft, SpaceCraftDocument} from '../schemas/spacecraft.schema';

import {SpacecraftDto} from "../dto/spacecraft.dto";
import {SpacecraftAlreadyExistException} from "../exceptions/spacecraft-already-exist.exception";
import {StatusSpacecraftEnumSchema} from "../schemas/status-spacecraft-enum.schema";

@Injectable()
export class SpacecraftService {

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
}