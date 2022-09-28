import { Injectable } from '@nestjs/common';
import { ResupplyMissionDto } from '../dto/resupply-mission.dto';
import { Model } from 'mongoose';
import {
  ResupplyMissionOrder,
  ResupplyMissionOrderDocument,
} from '../schemas/resupply-mission-order.schema';
import { SupplyOrderDTO } from '../dto/supply-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupplyOrder,
  SupplyOrderDocument,
} from '../schemas/supply-order.schema';

@Injectable()
export class ResupplySupervisionService {
  constructor(
    @InjectModel(ResupplyMissionOrder.name)
    private resupplyMissionOrderModel: Model<ResupplyMissionOrderDocument>,
    @InjectModel(SupplyOrder.name)
    private supplyOrderDocumentModel: Model<SupplyOrderDocument>,
  ) {}

  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    return this.resupplyMissionOrderModel.find().lean();
  }

  async resupply(resupply: SupplyOrderDTO): Promise<any> {
    await this.supplyOrderDocumentModel.create(resupply);
    return Promise.resolve();
  }

  async getResupplyOrder(): Promise<SupplyOrderDTO[]> {
    return this.supplyOrderDocumentModel.find().lean();
  }
}
