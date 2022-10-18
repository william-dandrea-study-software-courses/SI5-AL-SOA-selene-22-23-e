import { Injectable } from '@nestjs/common';
import {ModuleLifeProxyService} from "./module-life-proxy.service";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {MoonBase, MoonBaseDocument} from "../schemas/moon-base.schema";
import {NewMoonBaseDto} from "../dto/new-moon-base.dto";
import {MoonBaseNotExistException} from "../exceptions/moon-base-not-exist.exception";
import {NeedsDto} from "../dto/needs.dto";
import {MoonBaseDto} from "../dto/moon-base.dto";
import {InventoryDto} from "../dto/inventory.dto";
import {SupplyDto} from "../dto/supply.dto";

@Injectable()
export class MoonBaseService {
  private stockMax: number = 100;

  constructor(
      @InjectModel(MoonBase.name) private moonBaseModel: Model<MoonBaseDocument>,
      private moduleLifeProxyService: ModuleLifeProxyService) {}

  async getMoonBase(moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    return moonBase;
  }

  async getNeeds(): Promise<NeedsDto> {
    const modulesNeeds = await this.moduleLifeProxyService.getNeeds();
    const moonBase: MoonBase = await this.moonBaseModel.findOne();
    return new NeedsDto(this.stockMax-moonBase.stock + modulesNeeds.quantity);

  }

  async getInventory(): Promise<InventoryDto> {
    const modulesInventory = await this.moduleLifeProxyService.getInventory();
    const moonBase: MoonBase = await this.moonBaseModel.findOne();
    return new InventoryDto(moonBase.stock + modulesInventory.quantity);
  }

  async postMoonBase(newMoonBaseDto: NewMoonBaseDto): Promise<MoonBaseDto> {
    const listOfModules = []
    for (const id of newMoonBaseDto.listOfModuleIds) {
      const currentObject = await this.moduleLifeProxyService.getModule(id);
      listOfModules.push(currentObject)
    }
    const newMoonBase = await this.moonBaseModel.insertMany([{
      id_base: newMoonBaseDto.id_base,
      stock: newMoonBaseDto.initialStock,
      alarm_on: newMoonBaseDto.alarm_on,
      modules: listOfModules
    }])

    return newMoonBase
  }

  async fillStockBase(supply: SupplyDto, moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    moonBase.stock += supply.quantity;
    await moonBase.save()

    return moonBase;
  }

  async pickStockMoonBase(needs: NeedsDto, moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    moonBase.stock -= needs.quantity;
    await moonBase.save()

    return moonBase;
  }

  async putMoonBase(moonBaseId: number, newMoonBaseDto: NewMoonBaseDto): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    const listOfModules = []
    for (const id of newMoonBaseDto.listOfModuleIds) {
      const currentObject = await this.moduleLifeProxyService.getModule(id);
      listOfModules.push(currentObject)
    }
    moonBase.id_base = newMoonBaseDto.id_base;
    moonBase.stock = newMoonBaseDto.initialStock;
    moonBase.alarm_on = newMoonBaseDto.alarm_on;
    moonBase.modules = listOfModules;
    await moonBase.save();
    return moonBase
  }

  async isolateMoonBase(moonBaseId: number): Promise<MoonBaseDto> {
    const moonBase = await this.moonBaseModel.findOne({id_base:moonBaseId});
    if(moonBase===null) {
      throw new MoonBaseNotExistException(moonBaseId);
    }
    for (const id of moonBase.modules) {
      await this.moduleLifeProxyService.isolate(id);
    }
    moonBase.alarm_on = true;
    await moonBase.save();
    return moonBase;
  }

}
