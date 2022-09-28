import { Injectable } from '@nestjs/common';
import { ResupplyMissionDto } from '../dto/resupply-mission.dto';
import { NeedsDto } from '../../../../module-life-service/src/module-life-supervision/dto/needs.dto';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ResupplyMissionOrder,
  ResupplyMissionOrderDocument,
} from '../schemas/resupply-mission-order.schema';

import {SupplyOrderDTO} from '../dto/supply-order.dto';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {SupplyOrder, SupplyOrderDocument} from "../schemas/status-life-module.schema";

@Injectable()
export class ResupplySupervisionService {
  private _baseUrl: string;

  private _resupplySupervisionPath = '/resupply-supervision/';

  constructor(
    @InjectModel(ResupplyMissionOrder.name)
    private resupplyMissionOrderModel: Model<ResupplyMissionOrderDocument>,
    @InjectModel(SupplyOrder.name) private supplyOrderDocumentModel: Model<SupplyOrderDocument>
  ) {}

  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    return this.resupplyMissionOrderModel.find().lean();
  }

  async resupply(resupply : SupplyOrderDTO): Promise<any> {
    await this.supplyOrderDocumentModel.create(resupply)
    return Promise.resolve()
  }

  async getResupplyOrder(): Promise<SupplyOrderDTO[]>{
    return this.supplyOrderDocumentModel.find().lean()
  }
}
