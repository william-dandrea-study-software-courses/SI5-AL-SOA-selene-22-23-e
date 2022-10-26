import { Injectable, Logger } from "@nestjs/common";
import { ModuleLifeProxyService } from "./module-life-proxy.service";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {MoonBase, MoonBaseDocument} from "../schemas/moon-base.schema";
import {NewMoonBaseDto} from "../dto/new-moon-base.dto";
import {MoonBaseNotExistException} from "../exceptions/moon-base-not-exist.exception";
import {MoonBaseDto} from "../dto/moon-base.dto";
import {SupplyDto} from "../dto/supply.dto";
import {Supply} from "../schemas/supply.schema";
import {LunarModuleOutOfStocksException} from "../exceptions/lunar-module-out-of-stocks.exception";

@Injectable()
export class MoonBaseService {
  private stockMax = 100;
  private readonly logger = new Logger(MoonBaseService.name);

  constructor(
    @InjectModel(MoonBase.name) private moonBaseModel: Model<MoonBaseDocument>,
    private moduleLifeProxyService: ModuleLifeProxyService
  ) {}

  async getMoonBase(moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({ id_base: moonBaseId });
    if (moonBase === null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    return new MoonBaseDto(moonBase);
  }

  async getNeeds(): Promise<SupplyDto[]> {
    const modulesNeeds: SupplyDto[] = await this.moduleLifeProxyService.getNeeds();
    const moonBase: MoonBase = await this.moonBaseModel.findOne();
    if (!moonBase) {
      throw new MoonBaseNotExistException(1);
    }
    let needs : SupplyDto[] = [];
    moonBase.stock.forEach(supply => {
      if(supply.quantity<this.stockMax) {
        needs.push(new SupplyDto(supply.label, this.stockMax - supply.quantity));
      }
    });
    this.addModulesNeedsToMoonBaseNeeds(modulesNeeds, needs);
    return needs;
  }

  async getInventory(): Promise<SupplyDto[]> {
    const modulesInventory = await this.moduleLifeProxyService.getInventory();
    const moonBase: MoonBase = await this.moonBaseModel.findOne();
    if (!moonBase) {
      throw new MoonBaseNotExistException(1);
    }
    let inventory : SupplyDto[] = [];
    moonBase.stock.forEach(supply => {
      inventory.push(new SupplyDto(supply.label, supply.quantity));
    });
    this.addModulesInventoryToMoonBaseInventory(modulesInventory, inventory);
    return inventory;
  }

  async postMoonBase(newMoonBaseDto: NewMoonBaseDto): Promise<MoonBaseDto> {
    for (const id of newMoonBaseDto.listOfModuleIds) {
      await this.moduleLifeProxyService.getModule(id);
    }
    const newMoonBase = await this.moonBaseModel.create({
      id_base: newMoonBaseDto.id_base,
      stock: newMoonBaseDto.initialStock,
      alarm_on: newMoonBaseDto.alarm_on,
      modules: newMoonBaseDto.listOfModuleIds,
    });
    return new MoonBaseDto(newMoonBase);
  }

  async fillStockBase(supplies: SupplyDto[], moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    for (const supply of supplies) {
      let moonBaseSupply : Supply | undefined = moonBase.stock.find( s => s.label === supply.label);
      if (moonBaseSupply) {
        moonBaseSupply.quantity += supply.quantity;
      }
      else {
        moonBase.stock.push({label: supply.label, quantity: supply.quantity});
      }
    }
    await moonBase.save()
    return new MoonBaseDto(moonBase);
  }

  async pickStockMoonBase(needs: SupplyDto[], moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    for (const supply of needs) {
      let moonBaseSupply : Supply | undefined = moonBase.stock.find( s => s.label === supply.label);
      if (moonBaseSupply && moonBaseSupply.quantity-supply.quantity>=0) {
        moonBaseSupply.quantity -= supply.quantity;
      }
      else {
        throw new LunarModuleOutOfStocksException();
      }
    }
    await moonBase.save()

    return new MoonBaseDto(moonBase);
  }

  async putMoonBase(
    moonBaseId: number,
    newMoonBaseDto: NewMoonBaseDto
  ): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({ id_base: moonBaseId });
    if (moonBase === null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    const listOfModules = [];
    for (const id of newMoonBaseDto.listOfModuleIds) {
      const currentObject = await this.moduleLifeProxyService.getModule(id);
      listOfModules.push(currentObject);
    }
    moonBase.id_base = newMoonBaseDto.id_base;
    moonBase.stock = newMoonBaseDto.initialStock;
    moonBase.alarm_on = newMoonBaseDto.alarm_on;
    moonBase.modules = listOfModules;
    await moonBase.save();
    return new MoonBaseDto(moonBase);
  }

  async isolateMoonBase() {
    const moonBase = await this.moonBaseModel.findOne();
    if (moonBase === null) {
      throw new MoonBaseNotExistException(1);
    }
    for (const id of moonBase.modules) {
      await this.moduleLifeProxyService.isolate(id);
    }
    moonBase.alarm_on = true;
    await moonBase.save();
  }

  /*
    Privates methods
   */
  private addModulesNeedsToMoonBaseNeeds(modulesNeeds : SupplyDto[], moonBaseNeeds: SupplyDto[]) {
    modulesNeeds.forEach(supply => {
      const need: SupplyDto | undefined = moonBaseNeeds.find(s => s.label===supply.label);
      if(need) {
        need.quantity += supply.quantity;
      }
      else {
        moonBaseNeeds.push(supply);
      }
    });
  }

  private addModulesInventoryToMoonBaseInventory(modulesInventory : SupplyDto[], moonBaseInventory: SupplyDto[]) {
    modulesInventory.forEach(supply => {
      const inventory: SupplyDto | undefined = moonBaseInventory.find(s => s.label===supply.label);
      if(inventory) {
        inventory.quantity += supply.quantity;
      }
      else {
        moonBaseInventory.push(supply);
      }
    });
  }
}
