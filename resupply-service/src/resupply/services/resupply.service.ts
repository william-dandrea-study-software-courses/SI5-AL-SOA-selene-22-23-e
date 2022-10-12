import {Injectable} from '@nestjs/common';
import {ResupplyMissionDto} from '../dto/resupply-mission.dto';
import {Model} from 'mongoose';
import {ResupplyMissionOrder, ResupplyMissionOrderDocument,} from '../schemas/resupply-mission-order.schema';
import {SupplyOrderDTO} from '../dto/supply-order.dto';
import {InjectModel} from '@nestjs/mongoose';
import {SupplyOrder, SupplyOrderDocument,} from '../schemas/supply-order.schema';
import {StatusResupplyEnumSchema, StatusSupplyOrderEnumSchema} from "../schemas/status-resupply-enum.schema";
import {ResupplyMissionNotExist} from "../exceptions/resupply-mission-not-exist.exception";

@Injectable()
export class ResupplyService {
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
    await this.supplyOrderDocumentModel.create({...resupply, status: StatusSupplyOrderEnumSchema.PREPARING});
    return Promise.resolve();
  }

  async getResupplyOrder(): Promise<SupplyOrderDTO[]> {
    return this.supplyOrderDocumentModel.find().lean();
  }

  async validateOrder(orderId: string): Promise<string>{
    await this.supplyOrderDocumentModel.findByIdAndUpdate( orderId, {status:StatusSupplyOrderEnumSchema.ACCEPTED}).exec();
    let test2 = await this.supplyOrderDocumentModel.findOne({_id: orderId});
    let resupplyMission = await this.resupplyMissionOrderModel.findOne({state: StatusResupplyEnumSchema.PREPARING})
    if(resupplyMission === null){
      await this.resupplyMissionOrderModel.create({orders: [test2], state: StatusResupplyEnumSchema.PREPARING});
    }
    else {
      resupplyMission.orders.push(test2)
      resupplyMission.save()
    }
    return "Commande validée"
  }

  async send(resupplyMissionId: string): Promise<ResupplyMissionDto>{
    let resupplyMission = await this.resupplyMissionOrderModel.findOne({_id: resupplyMissionId});
    if(resupplyMission === null){
      throw new ResupplyMissionNotExist(resupplyMissionId);
    }
    resupplyMission.state = StatusResupplyEnumSchema.TRAVELING
    resupplyMission.save()
    let dto = new ResupplyMissionDto()
    dto._id = resupplyMission._id
    dto.orders = resupplyMission.orders
    dto.resupply_status = StatusResupplyEnumSchema.TRAVELING
    return dto
  }
}
