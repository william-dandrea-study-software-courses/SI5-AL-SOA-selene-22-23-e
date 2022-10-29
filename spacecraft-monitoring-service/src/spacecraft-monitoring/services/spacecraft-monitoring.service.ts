import {Injectable} from '@nestjs/common';
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {Kafka} from "kafkajs";


@Injectable()
export class SpacecraftMonitoringService {

  private kafka = new Kafka({
    clientId: 'eva-mission',
    brokers: ['kafka-service:9092']
  })

  arriving = [];
  landed = []

  constructor() {}

  async spacecraftLanded(id_spacecraft:string): Promise<void> {
    this.arriving = this.arriving.filter(s=>{
      return s!==id_spacecraft;
    })
    this.landed.push(id_spacecraft);
  }

  async spacecraftArriving(id_spacecraft:string): Promise<void> {
    this.arriving.push(id_spacecraft)
  }

  async spacecraftLaunched(id_spacecraft:string): Promise<void>{
    this.landed = this.landed.filter(s=>{
      return s!==id_spacecraft;
    })
  }

  async getArriving():Promise<string[]> {
    return this.arriving;
  }

  async getLanded():Promise<string[]> {
    return this.landed;
  }

}