import {Injectable} from '@nestjs/common';
import {ResupplyMissionDto} from '../dto/resupply-mission.dto';
import {Model} from 'mongoose';
import {ResupplyMissionOrder, ResupplyMissionOrderDocument,} from '../schemas/resupply-mission-order.schema';
import {SupplyOrderDTO} from '../dto/supply-order.dto';
import {InjectModel} from '@nestjs/mongoose';
import {SupplyOrder, SupplyOrderDocument,} from '../schemas/supply-order.schema';
import {StatusResupplyEnumSchema, StatusSupplyOrderEnumSchema} from "../schemas/status-resupply-enum.schema";
import {ResupplyMissionNotExist} from "../exceptions/resupply-mission-not-exist.exception";
import {SpacecraftIdDto} from "../dto/spacecraft-id.dto";
import {ResupplyConnotBeReaffectedException} from "../exceptions/resupply-connot-be-reaffected.exception";
import {Kafka} from "kafkajs";

@Injectable()
export class ResupplyService {

  private kafka = new Kafka({
    clientId: 'resupply',
    brokers: ['kafka-service:9092']
  })


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
    await this.supplyOrderDocumentModel.create({...resupply, status: StatusSupplyOrderEnumSchema.AWAITING});
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

  async affectSpacecraft(resupply_mission_id: string, spacecraft_id_dto: SpacecraftIdDto){
    let resupplyMission = await this.resupplyMissionOrderModel.findOne({_id: resupply_mission_id});
    if(resupplyMission === null){
      throw new ResupplyMissionNotExist(resupply_mission_id);
    }
    if(resupplyMission.state === StatusResupplyEnumSchema.TRAVELING || resupplyMission.state === StatusResupplyEnumSchema.DONE){
      throw new ResupplyConnotBeReaffectedException(resupply_mission_id);
    }

    resupplyMission.spacecraft_id = spacecraft_id_dto.spacecraft_id;
    await resupplyMission.save()
    let dto = new ResupplyMissionDto()
    dto._id = resupplyMission._id
    dto.orders = resupplyMission.orders
    dto.resupply_status = resupplyMission.state
    dto.spacecraft_id = resupplyMission.spacecraft_id

    const producer = await this.kafka.producer()

    // Producing
    await producer.connect()
    await producer.send({
      topic: 'spacecraft-assigned',
      messages: [
        { value:'{ spacecraft_id:'+dto.spacecraft_id+', resupply_mission_id: '+ dto._id +' }'},
      ],
    });
    await producer.disconnect();

    return dto
  }


  async spacecraft_has_been_destroyed(id_resupply: string){
    let resupplyMission = await this.resupplyMissionOrderModel.findOne({_id: id_resupply});
    if(resupplyMission === null){
      throw new ResupplyMissionNotExist(id_resupply);
    }
    resupplyMission.state = StatusResupplyEnumSchema.PREPARING
    resupplyMission.spacecraft_id = null
    resupplyMission.save()
  }
}
