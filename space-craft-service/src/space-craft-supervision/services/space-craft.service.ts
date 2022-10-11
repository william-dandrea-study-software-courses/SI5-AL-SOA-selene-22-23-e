import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import {SpaceCraft, SpaceCraftDocument} from '../schemas/space-craft.schema';

import {SpaceCraftDTO} from "../dto/space-craft.dto";
import {SpaceCraftAlreadyExistException} from "../exceptions/space-craft-already-exist.exception";
import {StatusSpacecraftEnumSchema} from "../schemas/status-spacecraft-enum.schema";

@Injectable()
export class SpaceCraftService {

  constructor(@InjectModel(SpaceCraft.name) private spaceCraftModel: Model<SpaceCraftDocument>) {}

  async getSpaceCraft(): Promise<SpaceCraftDTO[]> {
    return this.spaceCraftModel.find().then(spaceCrafts => {
      let response : SpaceCraftDTO[]=[];
      spaceCrafts.forEach(spaceCraft => {
        let dto = new SpaceCraftDTO();
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

  async postSpaceCraft(spacecraftDTO: SpaceCraftDTO): Promise<SpaceCraftDTO> {
    const alreadyExists = await this.spaceCraftModel.find({ id_spacecraft: spacecraftDTO.id_spacecraft });
    if (alreadyExists.length > 0) {
      throw new SpaceCraftAlreadyExistException(spacecraftDTO.id_spacecraft);
    }
    return await this.spaceCraftModel.create(spacecraftDTO);
  }

  async putSpaceCraft(spaceCraftId: number, spaceCraftDto: SpaceCraftDTO): Promise<SpaceCraftDTO> {
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