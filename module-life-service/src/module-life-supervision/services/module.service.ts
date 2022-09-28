import { Injectable } from '@nestjs/common';
import {Expression, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

import { LifeModule, LifeModuleDocument } from '../schemas/module.schema';

import { ModuleDto } from "../dto/module.dto";

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyDto } from "../dto/supply.dto";
import { ModuleLifeStatusDto } from "../dto/module-life-status.dto";

@Injectable()
export class ModuleService {
  constructor(@InjectModel(LifeModule.name) private moduleModel: Model<LifeModuleDocument>) {}

  async getModules(): Promise<ModuleDto[]> {
    return this.moduleModel.find().lean().then(listDto => {
      let response : ModuleDto[]=[];
      listDto.forEach(x => {
        let dto = new ModuleDto();
        dto.id_module = x.id_module;
        dto.lifeStatus = x.lifeStatus;
        dto.needsStatus = x.needsStatus;
        response.push(dto);
      })
      return response;
    });
  }

  async getModulesLifeStatus(): Promise<ModuleLifeStatusDto[]> {
    return this.moduleModel.find().lean().then(listDto => {
      let response : ModuleLifeStatusDto[]=[];
      listDto.forEach(x => {
        response.push(new ModuleLifeStatusDto(x))
      })
      return response;
    });
  }

  async getNeeds(): Promise<NeedsDto> {
    return this.moduleModel.find().lean().then(listDto =>{
      return new NeedsDto(listDto);
    });
  }

  async postModule(statusLifeModuleInDto: ModuleDto): Promise<ModuleDto> {
    console.log(statusLifeModuleInDto)
    const alreadyExists = await this.moduleModel.find({ id_module: statusLifeModuleInDto.id_module });
    if (alreadyExists.length > 0) {
      throw new ModuleAlreadyExistsException(statusLifeModuleInDto.id_module);
    }
    return await this.moduleModel.create(statusLifeModuleInDto);
  }

  async supplyModule(supply: SupplyDto) {
    let supplyQuantity : number = supply.quantity;
    this.moduleModel.find().lean().then(async modules => {
      for (const module of modules) {
        if (supplyQuantity > 0 && module.needsStatus) {
          module.needsStatus = false;
          await this.moduleModel.findByIdAndUpdate( module._id, module).exec();
          supplyQuantity -= 1;
        }
      }
    });
  }
}