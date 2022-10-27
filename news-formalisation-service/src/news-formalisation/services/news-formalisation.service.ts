import { Injectable,Logger } from '@nestjs/common';
import {Kafka} from "kafkajs";


@Injectable()
export class NewsFormalisationService {
  private readonly logger = new Logger(NewsFormalisationService.name);

  spacesuits = []

  constructor() {}

  private kafka = new Kafka({
    clientId: "eva-mission",
    brokers: ["kafka-service:9092"],
  });

  async sendNewsSpacesuitToMary(json:JSON) {
    const producer = await this.kafka.producer()
    let formatedMessage = "Un problème a été détecté sur la combinaison numero "+json["spacesuit_id"]+" utilisé par l'astronaute "+json['astronaut_id']+" .\n";
    if(json["o2_rate"]!==null &&json["o2_rate"]!==undefined){
      formatedMessage = formatedMessage+ "Le taux d'oxygène est anormalement bas avec un taux de " + json['o2_rate']+"%.\n"
    }
    if(json["temperature"]!==null && json["temperature"]!==undefined){
      formatedMessage = formatedMessage+ "La température est anormalement basse, " + json['temperature']+"°C.\n"

    }
    if(json["pressure"]!==null && json["pressure"]!==undefined){
      formatedMessage = formatedMessage+ "La pression est anormalement élevée, elle est de " + json['pressure']+" Bar.\n"

    }
    if(json["cardiac_rythm"]!==null && json["cardiac_rythm"]!==undefined){
      formatedMessage = formatedMessage+ "Le rythme cardiaque est trop haut et atteint les " + json['cardiac_rythm']+" Bpm.\n"
    }

    await producer.connect()

    this.logger.log(formatedMessage)

    await producer.send({
      topic: 'news',
      messages: [{value:formatedMessage},]
    });
    await producer.disconnect();

  }

  async sendNewsMeteoriteToMarie(){
    const producer = await this.kafka.producer()

    await producer.connect()

    await producer.send({
      topic: 'news',
      messages: [{value:"Une météorite dangereuse a été détecté, la base est isolée"},]
    });
    await producer.disconnect();
  }

}
