import {Injectable} from '@nestjs/common';
import {Kafka} from "kafkajs";


@Injectable()
export class SpacecraftMonitoringService {

  private kafka = new Kafka({
    clientId: 'eva-mission',
    brokers: ['kafka-service:9092']
  })

  arriving = [];
  landed = [];
  launched = [];
  damaged = [];

  constructor() {}

  async spacecraftLanded(id_spacecraft:string): Promise<void> {
    this.arriving = this.arriving.filter(s=>{
      return s!==id_spacecraft;
    });
    this.landed = this.landed.filter(s=>{
      return s!==id_spacecraft;
    });
    this.landed.push(id_spacecraft);
  }

  async spacecraftArriving(id_spacecraft:string): Promise<void> {
    this.launched = this.launched.filter(s=>{
      return s!==id_spacecraft;
    });
    this.arriving.push(id_spacecraft)
  }

  async spacecraftLaunched(id_spacecraft:string): Promise<void>{
    this.landed = this.landed.filter(s=>{
      return s!==id_spacecraft;
    });
    this.launched.push(id_spacecraft);
  }

  async spacecraftDamaged(id_spacecraft:string): Promise<void>{
    this.landed = this.landed.filter(s=>{
      return s!==id_spacecraft;
    });
    this.arriving = this.arriving.filter(s=>{
      return s!==id_spacecraft;
    });
    this.launched = this.launched.filter(s=>{
      return s!==id_spacecraft;
    });
    this.damaged.push(id_spacecraft);
  }

  async getArriving():Promise<string[]> {
    return this.arriving;
  }

  async getLanded():Promise<string[]> {
    return this.landed;
  }

  async getLaunched():Promise<string[]> {
    return this.launched;
  }

  async getDamaged():Promise<string[]> {
    return this.damaged;
  }

}