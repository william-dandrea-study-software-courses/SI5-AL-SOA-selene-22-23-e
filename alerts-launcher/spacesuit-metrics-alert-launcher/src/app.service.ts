import { Injectable } from '@nestjs/common';
import {Kafka} from "kafkajs";

@Injectable()
export class AppService {

  private kafka = new Kafka({
    clientId: "spacecraft",
    brokers: ["kafka-service:9092"],
  });


  getHello(): string {
    return 'Hello World!';
  }
}
