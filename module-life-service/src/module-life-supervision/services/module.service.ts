import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { LifeModule, LifeModuleDocument } from "../schemas/life-module.schema";
import { MoonBase, MoonBaseDocument } from "../schemas/moon-base.schema";

import { LifeModuleDto } from "../dto/life-module.dto";

import { ModuleAlreadyExistsException } from "../exceptions/module-already-exists.exception";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyDto } from "../dto/supply.dto";
import { ModuleLifeStatusDto } from "../dto/module-life-status.dto";
import { ModuleAlreadyIsolatedException } from "../exceptions/module-already-isolated.exception";
import { InventoryDto } from "../dto/inventory.dto";
import {
  VitalsModule,
  VitalsModuleDocument,
} from "../schemas/vitals-module.schema";
import {
  ModuleAlreadyAtTheMaximumSupplyQuantityException
} from "../exceptions/module-already-at-the-maximum-supply-quantity.exception";
import {LunarModuleOutOfStocksException} from "../exceptions/lunar-module-out-of-stocks.exception";
import {NewMoonBaseDto} from "../dto/new-moon-base.dto";
import {ModuleNotExistException} from "../exceptions/module-not-exist.exception";
import {MoonBaseNotExistException} from "../exceptions/moon-base-not-exist.exception";
import {ErrorDto} from "../../shared/dto/error.dto";
import {VitalsModuleDto} from "../dto/vitals-module.dto";

@Injectable()
export class ModuleService {
  private suppliesQuantityMax = 10;
  private suppliesQuantityMin = 5;

  private _baseUrlNeedsControl: string;

  constructor(
    @InjectModel(LifeModule.name)
    private moduleModel: Model<LifeModuleDocument>,
    @InjectModel(VitalsModule.name)
    private vitalsModel: Model<VitalsModuleDocument>,
    @InjectModel(MoonBase.name)
    private moonBaseModel: Model<MoonBaseDocument>,
  ) {
    this._baseUrlNeedsControl = "http://" + process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT
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



  async getModulesLifeStatus(): Promise<ModuleLifeStatusDto[]> {
    return this.moduleModel.find().then((listDto) => {
      const response: ModuleLifeStatusDto[] = [];
      listDto.forEach((x) => {
        response.push(new ModuleLifeStatusDto(x));
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

  async postModule(moduleDto: LifeModuleDto): Promise<LifeModuleDto> {
    const alreadyExists = await this.moduleModel.find({
      id_module: moduleDto.id_module,
    });
    if (alreadyExists.length > 0) {
      throw new ModuleAlreadyExistsException(moduleDto.id_module);
    }
    return await this.moduleModel.create(moduleDto);
  }

  async putModule(
    moduleId: number,
    moduleDto: LifeModuleDto
  ): Promise<LifeModuleDto> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if (module === null) {
      throw new HttpException("module not found", HttpStatus.NOT_FOUND);
    }
    module.vitals = moduleDto.vitals;
    module.supplies = moduleDto.supplies;
    module.isolated = moduleDto.isolated;
    module.save();
    return module;
  }

  async supplyModule(supply: SupplyDto) {
    let supplyQuantity: number = supply.quantity;
    this.moduleModel.find().then(async (modules) => {
      modules.forEach((module) => {
        if (supplyQuantity > 0 && module.supplies < this.suppliesQuantityMax) {
          const needs = Math.min(
            this.suppliesQuantityMax - module.supplies,
            supplyQuantity
          );
          module.supplies += needs;
          module.save();
          supplyQuantity -= needs;
        }
      });
    });
  }

  async isolate(moduleId: number) {
    const module = await this.moduleModel.findOne({ id_module: moduleId });
    if (module === null) {
      throw new HttpException("module not found", HttpStatus.NOT_FOUND);
    }
    if (module.isolated) {
      throw new ModuleAlreadyIsolatedException(moduleId);
    }
    module.isolated = true;
    module.save();
    return module;
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

  async supplyOneModule(supply: SupplyDto, moduleId: number, baseId: number): Promise<any> {
    const module = await this.moduleModel.findOne({ id_module: moduleId });

    if (module === null) {
      throw new HttpException("module not found", HttpStatus.NOT_FOUND);
    }

    if (module.supplies + supply.quantity > this.suppliesQuantityMax) {
      throw new ModuleAlreadyAtTheMaximumSupplyQuantityException(moduleId, module.supplies, module.supplies + supply.quantity);
    }


    // Call the needs control service for decreasing the stock
    const stockBase = await this.getBase(baseId);
    stockBase.stock = stockBase.stock - supply.quantity;
    await stockBase.save()


    module.supplies =  module.supplies + supply.quantity;
    await module.save();
    return module;
  }



  async createMoonBase(newMoonBaseDto: NewMoonBaseDto): Promise<any> {

    const listOfModules = []
    for (const id of newMoonBaseDto.listOfModuleIds) {
      const currentObject = await this.moduleModel.findOne({id_module: id})
      if (currentObject == null)
        throw new ModuleNotExistException(id)
      listOfModules.push(currentObject)
    }


    const newMoonBase = await this.moonBaseModel.insertMany([{
      id_base: newMoonBaseDto.id_base,
      stock: newMoonBaseDto.initialStock,
      modules: listOfModules
    }])

    return newMoonBase

  }


  async getBase(idBase: number): Promise<any> {
    const moonBase = await this.moonBaseModel.findOne({id_base: idBase});
    if (moonBase == null)
      throw new MoonBaseNotExistException(idBase);
    return moonBase;
  }

  async fillStockBase(quantity: SupplyDto, idBase: number): Promise<any> {
    const stockBase = await this.getBase(idBase);
    stockBase.stock = stockBase.stock + quantity.quantity;
    await stockBase.save()

    return stockBase;
  }

  /*async pickFromStockBase(quantity: SupplyDto): Promise<any> {
    const stockBase = await this.stockBase();
    const currentStock = stockBase.stock;
    const currentStockId = stockBase._id;

    if (currentStock - quantity.quantity <= 0) {
      throw new LunarModuleOutOfStocksException();
    }

    await this.moonBaseModel.updateOne(
        { _id: currentStockId },
        {
          $set: {
            stock: currentStock - quantity.quantity,
          },
        },
        { upsert: true }
    );

    return await this.stockBase();
  } */






}
