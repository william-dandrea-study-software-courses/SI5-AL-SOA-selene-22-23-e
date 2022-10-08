import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { LifeModule, LifeModuleDocument } from '../schemas/life-module.schema';

import { LifeModuleDto } from "../dto/life-module.dto";

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyDto } from "../dto/supply.dto";
import { ModuleLifeStatusDto } from "../dto/module-life-status.dto";
import { ModuleAlreadyIsolatedException } from "../exceptions/module-already-isolated.exception";
import {InventoryDto} from "../dto/inventory.dto";
import {ErrorDto} from "../../shared/dto/error.dto";
import {VitalsModuleDto} from "../dto/vitals-module.dto";

@Injectable()
export class ModuleService {
  private suppliesQuantityMax : number = 10;
  private suppliesQuantityMin : number = 5;

  constructor(@InjectModel(LifeModule.name) private moduleModel: Model<LifeModuleDocument>) {}

  async getModules(): Promise<LifeModuleDto[]> {
    return this.moduleModel.find().then(modules => {
      let response : LifeModuleDto[]=[];
      modules.forEach(module => {
        let dto = new LifeModuleDto();
        dto.id_module = module.id_module;
        dto.vitals = new VitalsModuleDto(module.vitals);
        dto.supplies = module.supplies;
        dto.isolated = module.isolated;
        response.push(dto);
      })
      return response;
    });
  }

  async getModulesLifeStatus(): Promise<ModuleLifeStatusDto[]> {
    return this.moduleModel.find().then(listDto => {
      let response : ModuleLifeStatusDto[]=[];
      listDto.forEach(x => {
        response.push(new ModuleLifeStatusDto(x))
      })
      return response;
    });
  }

  async getNeeds(): Promise<NeedsDto> {
    let needs = 0;
    await this.moduleModel.find().then(modules =>{
      modules.forEach(module => {
        if (module.supplies<this.suppliesQuantityMax) {
          needs += this.suppliesQuantityMax - module.supplies;
        }
      })
    });
    return new NeedsDto(needs);
  }

  async postModule(moduleDto: LifeModuleDto): Promise<LifeModuleDto> {
    const alreadyExists = await this.moduleModel.find({ id_module: moduleDto.id_module });
    if (alreadyExists.length > 0) {
      throw new ModuleAlreadyExistsException(moduleDto.id_module);
    }
    return await this.moduleModel.create(moduleDto);
  }

  async putModule(moduleId: number, moduleDto: LifeModuleDto): Promise<LifeModuleDto> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if(module === null) {
      throw new HttpException("module not found",HttpStatus.NOT_FOUND,);
    }
    module.vitals = moduleDto.vitals;
    module.supplies = moduleDto.supplies;
    module.isolated = moduleDto.isolated;
    module.save();
    return module;
  }

  async supplyModule(supply: SupplyDto) {
    let supplyQuantity : number = supply.quantity;
    this.moduleModel.find().then(async modules => {
      modules.forEach(module => {
        if (supplyQuantity > 0 && module.supplies<this.suppliesQuantityMax) {
          const needs = Math.min(this.suppliesQuantityMax - module.supplies, supplyQuantity);
          module.supplies += needs;
          module.save();
          supplyQuantity -= needs;
        }
      })
    });
  }

  async isolate(moduleId : number) {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if(module === null) {
      throw new HttpException("module not found",HttpStatus.NOT_FOUND,);
    }
    if (module.isolated) {
      throw new ModuleAlreadyIsolatedException(moduleId);
    }
    module.isolated = true;
    module.save();
    return module;
  }

  async getInventory() :Promise<InventoryDto> {
    let quantity = 0;
    await this.moduleModel.find().lean().then(modules =>{
      modules.forEach(module => {
        quantity += module.supplies
      })
    });
    return new InventoryDto(quantity);
  }
}