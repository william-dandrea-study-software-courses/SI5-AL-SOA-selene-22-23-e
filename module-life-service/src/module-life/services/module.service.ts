import {Injectable, Logger} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { LifeModule, LifeModuleDocument } from "../schemas/life-module.schema";

import { LifeModuleDto } from "../dto/life-module.dto";

import { ModuleAlreadyExistsException } from "../exceptions/module-already-exists.exception";
import { SupplyDTO } from "../dto/supply.dto";
import { ModuleVitalsDto } from "../dto/module-vitals.dto";
import { VitalsModule, VitalsModuleDocument } from "../schemas/vitals-module.schema";
import { ModuleAlreadyAtTheMaximumSupplyQuantityException } from "../exceptions/module-already-at-the-maximum-supply-quantity.exception";
import { ModuleNotExistException } from "../exceptions/module-not-exist.exception";
import { MoonBaseProxyService } from "./moon-base-proxy.service";
import {Supply} from "../schemas/supply.schema";
import {LifeModuleTypeEnumSchema} from "../schemas/life-module-type-enum";

@Injectable()
export class ModuleService {
  private readonly logger = new Logger(ModuleService.name);

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
        dto.type = module.type;
        dto.astronauts = module.astronauts;
        dto.vitals = module.vitals;
        dto.supplies = module.supplies;
        dto.isolated = module.isolated;
        response.push(dto);
      });
      return response;
    });
  }

  async getModule(moduleId: number): Promise<LifeModule> {
    const module = await this.moduleModel.findOne({id_module: moduleId})
    if (module == null) {
      throw new ModuleNotExistException(moduleId)
    }
    return module;
  }

  async getVitals(): Promise<ModuleVitalsDto[]> {
    return this.moduleModel.find().then((listDto) => {
      const response: ModuleVitalsDto[] = [];
      listDto.forEach((x) => {
        response.push(new ModuleVitalsDto(x));
      });
      return response;
    });
  }

  async getNeeds(): Promise<SupplyDTO[]> {
    let needsDto: SupplyDTO[] = [];
    await this.moduleModel.find().then((modules) => {
      modules.forEach(module => {
        const moduleSupplies: Supply[] = module.supplies;
        moduleSupplies.forEach(supply => {
          if (supply.quantity < this.suppliesQuantityMax) {
            this.addSupplyToNeeds(new SupplyDTO(supply.label, this.suppliesQuantityMax-supply.quantity), needsDto);
          }
        })
      });
    });
    return needsDto;
  }

  async getInventory(): Promise<SupplyDTO[]> {
    let inventory: SupplyDTO[] = [];
    await this.moduleModel.find().lean().then(modules => {
      modules.forEach(module => {
        const moduleSupplies: Supply[] = module.supplies;
        moduleSupplies.forEach(supply => {
          this.addSupplyToInventory(new SupplyDTO(supply.label, supply.quantity), inventory);
        })
      });
    });
    return inventory;
  }

  async postModule(moduleDto: LifeModuleDto): Promise<LifeModule> {
    const alreadyExists = await this.moduleModel.find({
      id_module: moduleDto.id_module,
    });
    if (alreadyExists.length > 0) {
      throw new ModuleAlreadyExistsException(moduleDto.id_module);
    }
    const module = await this.moduleModel.create(moduleDto);
    return module
  }

  async supplyModule(supplies: SupplyDTO[], moduleId: number): Promise<any> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });

    if (module === null) {
      throw new ModuleNotExistException(moduleId);
    }
    for (const supply of supplies) {
      let moduleSupply : Supply | undefined = module.supplies.find( s => s.label === supply.label);
      if (moduleSupply) {
        if (moduleSupply.quantity + supply.quantity > this.suppliesQuantityMax) {
          throw new ModuleAlreadyAtTheMaximumSupplyQuantityException(moduleId, supply.label, moduleSupply.quantity, moduleSupply.quantity + supply.quantity);
        }
        moduleSupply.quantity += supply.quantity;
      }
      else {
        if (supply.quantity > this.suppliesQuantityMax) {
          throw new ModuleAlreadyAtTheMaximumSupplyQuantityException(moduleId, supply.label, 0, supply.quantity);
        }
        module.supplies.push({label: supply.label, quantity: supply.quantity});
      }
    }
    await this.moonBaseProxyService.pickFromMoonBase(supplies);
    await module.save();
    return module;
  }

  async putModule(moduleId: number, moduleDto: LifeModuleDto): Promise<LifeModule> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if (module === null) {
      throw new ModuleNotExistException(moduleId);
    }
    module.vitals = moduleDto.vitals;
    module.type = moduleDto.type;
    module.astronauts = moduleDto.astronauts;
    module.supplies = moduleDto.supplies;
    module.isolated = moduleDto.isolated;
    module.save();
    return module;
  }

  async isolateModule(moduleId: number) {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if (module === null) {
      throw new ModuleNotExistException(moduleId);
    }
    if (module.type !== LifeModuleTypeEnumSchema.SAFETY) {
      const bunker = await this.moduleModel.findOne({ type : LifeModuleTypeEnumSchema.SAFETY});
      for(const astronautId of module.astronauts) {
        bunker.astronauts.push(astronautId);
        await this.moonBaseProxyService.secureAstronaut(astronautId);
      }
      module.astronauts = [];
      bunker.save();
    }
    module.isolated = true;
    module.save();
    return module;
  }

  /*
    Private methods
   */

  private addSupplyToNeeds(supplydto: SupplyDTO, needs: SupplyDTO[]) {
    const supply : SupplyDTO | undefined = needs.find(s => s.label === supplydto.label);
    if (supply) {
      supply.quantity += supplydto.quantity;
    }
    else {
      needs.push(supplydto)
    }
  }

  private addSupplyToInventory(supplydto: SupplyDTO, inventory: SupplyDTO[]) {
    const supply : SupplyDTO | undefined = inventory.find(s => s.label === supplydto.label);
    if (supply) {
      supply.quantity += supplydto.quantity;
    }
    else {
      inventory.push(supplydto)
    }
  }

}
