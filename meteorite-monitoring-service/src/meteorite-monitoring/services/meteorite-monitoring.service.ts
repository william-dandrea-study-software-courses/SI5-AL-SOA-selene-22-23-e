import {Injectable, Logger} from '@nestjs/common';
import { Model } from "mongoose";
import { Kafka } from "kafkajs";
import { InjectModel } from "@nestjs/mongoose";
import {Meteorite, MeteoriteDocument} from "../schemas/meteorite.schema";
import {MeteoriteDto} from "../dto/meteorite.dto";

@Injectable()
export class MeteoriteMonitoringService {
  private readonly logger = new Logger(MeteoriteMonitoringService.name);

  private kafka = new Kafka({
    clientId: "meteorite-monitoring",
    brokers: ["kafka-service:9092"],
  });

  constructor(@InjectModel(Meteorite.name)  private meteoriteModel: Model<MeteoriteDocument>
  ) {}

  async getMeteorites(): Promise<Meteorite[]> {
    return await this.meteoriteModel.find().lean();
  }

  async getMeteoriteDanger(): Promise<boolean> {
    let danger = false;
    const meteorites : Meteorite[] = await this.meteoriteModel.find();
    meteorites.forEach( meteorite => {
      if(meteorite.dangerous) {
        danger = true;
      }
    });
    return danger;
  }


  async post(meteoriteDto: MeteoriteDto): Promise<Meteorite> {
    if(meteoriteDto.dangerous) {
      this.emitKafkaEvent("dangerous-meteorite", "please isolate base")
    }
    return await this.meteoriteModel.create(meteoriteDto);
  }

  private async emitKafkaEvent(topic: string, message: string) {
    const producer = await this.kafka.producer();

    // Producing
    await producer.connect();
    this.logger.log("send meteorite");
    await producer.send({
      topic: topic,
      messages: [
        { value: message },
      ],
    });
    await producer.disconnect();
  }
}
