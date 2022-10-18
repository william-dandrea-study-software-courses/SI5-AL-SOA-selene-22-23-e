import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { LifeModule, LifeModuleDocument } from "../schemas/life-module.schema";

import { LifeModuleDto } from "../dto/life-module.dto";

import { ModuleAlreadyExistsException } from "../exceptions/module-already-exists.exception";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyDto } from "../dto/supply.dto";
import { ModuleVitalsDto } from "../dto/module-vitals.dto";
import { ModuleAlreadyIsolatedException } from "../exceptions/module-already-isolated.exception";
import { InventoryDto } from "../dto/inventory.dto";
import { VitalsModule, VitalsModuleDocument } from "../schemas/vitals-module.schema";
import { ModuleAlreadyAtTheMaximumSupplyQuantityException } from "../exceptions/module-already-at-the-maximum-supply-quantity.exception";
import { ModuleNotExistException } from "../exceptions/module-not-exist.exception";
import { MoonBaseProxyService } from "./moon-base-proxy.service.spec";

@Injectable()
export class ModuleService {
  private suppliesQuantityMax = 10;
  private suppliesQuantityMin = 5;

  constructor(
    @InjectModel(LifeModule.name)
    private moduleModel: Model<LifeModuleDocument>,
    @InjectModel(VitalsModule.name)
    private vitalsModel: Model<VitalsModuleDocument>,
    private readonly moonBaseProxyService: MoonBaseProxyService,
  ) {
  }

  async getModules(): Promise<LifeModuleDto[]> {
    return this.moduleModel.find().then((modules) => {
      const response: LifeModuleDto[] = [];
      modules.forEach((module) => {
        const dto = new LifeModuleDto();
        dto.id_module = module.id_module;
        dto.vitals = module.vitals;
        dto.supplies = module.supplies;
        dto.isolated = module.isolated;
        response.push(dto);
      });
      return response;
    });
  }

  async getModule(moduleId: number): Promise<LifeModuleDto> {
    const module = await this.moduleModel.findOne({id_module: moduleId})
    if (module == null)
      throw new ModuleNotExistException(moduleId)
    return module;
  }

  async getModulesVitals(): Promise<ModuleVitalsDto[]> {
    return this.moduleModel.find().then((listDto) => {
      const response: ModuleVitalsDto[] = [];
      listDto.forEach((x) => {
        response.push(new ModuleVitalsDto(x));
      });
      return response;
    });
  }

  async getNeeds(): Promise<NeedsDto> {
    let needs = 0;
    await this.moduleModel.find().then((modules) => {
      modules.forEach((module) => {
        if (module.supplies < this.suppliesQuantityMax) {
          needs += this.suppliesQuantityMax - module.supplies;
        }
      });
    });
    return new NeedsDto(needs);
  }

  async getInventory(): Promise<InventoryDto> {
    let quantity = 0;
    await this.moduleModel
        .find()
        .lean()
        .then((modules) => {
          modules.forEach((module) => {
            quantity += module.supplies;
          });
        });
    return new InventoryDto(quantity);
  }

  async postModule(moduleDto: LifeModuleDto): Promise<LifeModuleDto> {
    const alreadyExists = await this.moduleModel.find({
      id_module: moduleDto.id_module,
    });
    if (alreadyExists.length > 0) {
      throw new ModuleAlreadyExistsException(moduleDto.id_module);
    }
    return await this.moduleModel.create(moduleDto);
  }

  async supplyModule(supply: SupplyDto, moduleId: number): Promise<any> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });

    if (module === null) {
      throw new ModuleNotExistException(moduleId);
    }

    if (module.supplies + supply.quantity > this.suppliesQuantityMax) {
      throw new ModuleAlreadyAtTheMaximumSupplyQuantityException(moduleId, module.supplies, module.supplies + supply.quantity);
    }
    await this.moonBaseProxyService.pickFromMoonBase(supply);
    module.supplies =  module.supplies + supply.quantity;
    await module.save();
    return module;
  }

  async putModule(
    moduleId: number,
    moduleDto: LifeModuleDto
  ): Promise<LifeModuleDto> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if (module === null) {
      throw new ModuleNotExistException(moduleId);
    }
    module.vitals = moduleDto.vitals;
    module.supplies = moduleDto.supplies;
    module.isolated = moduleDto.isolated;
    module.save();
    return module;
  }

  async isolateModule(moduleId: string) {
    const module = await this.moduleModel.findOne({ _id: moduleId });
    if (module === null) {
      throw new ModuleNotExistException(moduleId);
    }
    if (module.isolated) {
      throw new ModuleAlreadyIsolatedException(moduleId);
    }
    module.isolated = true;
    module.save();
    return module;
  }

}
