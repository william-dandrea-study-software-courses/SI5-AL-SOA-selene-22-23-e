import { Injectable } from '@nestjs/common';
import {SupplyOrderDTO} from '../dto/supply-order.dto';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {SupplyOrder, SupplyOrderDocument} from "../schemas/status-life-module.schema";

@Injectable()
export class ResupplySupervisionService {
  constructor( @InjectModel(SupplyOrder.name) private supplyOrderDocumentModel: Model<SupplyOrderDocument>) {
  }

  async resupply(resupply : SupplyOrderDTO): Promise<any> {
    await this.supplyOrderDocumentModel.create(resupply)
    return Promise.resolve()
  }

  async getResupplyOrder(): Promise<SupplyOrderDTO[]>{
    return this.supplyOrderDocumentModel.find().lean()
  }
}
