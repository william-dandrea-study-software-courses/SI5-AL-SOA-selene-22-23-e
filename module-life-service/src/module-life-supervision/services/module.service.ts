import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

import { StatusLifeModule, StatusLifeModuleDocument } from '../schemas/status-life-module.schema';

import { ModuleInDto } from "../dto/module-in.dto";
import { ModuleDto} from "../dto/module.dto";

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import {NeedsDto} from "../dto/needs.dto";

@Injectable()
export class ModuleService {
  constructor(@InjectModel(StatusLifeModule.name) private statusLifeModuleModel: Model<StatusLifeModuleDocument>) {}

  async getModules(): Promise<ModuleDto[]> {
    return this.statusLifeModuleModel.find().lean();
  }

  async getNeeds(): Promise<NeedsDto[]> {
    return this.statusLifeModuleModel.find().lean();
  }

  async postModule(statusLifeModuleInDto: ModuleInDto): Promise<ModuleDto> {
    console.log(statusLifeModuleInDto)
    const alreadyExists = await this.statusLifeModuleModel.find({ id_module: statusLifeModuleInDto.id_module });
    if (alreadyExists.length > 0) {
      throw new ModuleAlreadyExistsException(statusLifeModuleInDto.id_module);
    }
    return await this.statusLifeModuleModel.create(statusLifeModuleInDto);
  }
}