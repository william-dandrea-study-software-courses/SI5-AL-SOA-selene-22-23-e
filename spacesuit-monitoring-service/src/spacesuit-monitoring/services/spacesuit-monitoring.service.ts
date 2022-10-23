import { Injectable,Logger } from '@nestjs/common';
import {Kafka} from "kafkajs";


@Injectable()
export class SpacesuitMonitoringService {
  private readonly logger = new Logger(SpacesuitMonitoringService.name);

  spacesuits = []

  constructor() {}

  private kafka = new Kafka({
    clientId: "eva-mission",
    brokers: ["kafka-service:9092"],
  });

  async verifyVitals(id_spacesuit: number,cardiac_rythm:number, pressure:number,o2_rate:number,temperature:number,power:number, astonaut_id: number) {
    this.logger.log('Verifying actual vitals')
    let test = []

    let exist = false
    let spacesuit;
    this.spacesuits.forEach(s=>{
      if(s.spacesuit_id == id_spacesuit){
        exist = true;
        spacesuit = s
      }
    })
    let isProblem = false;

    if(!exist) {
      this.spacesuits.push({
        spacesuit_id: id_spacesuit,
        o2_rate: o2_rate,
        pressure: pressure,
        temperature: temperature,
        power: power,
        cardiac_rythm: cardiac_rythm
      })

      if(o2_rate < 80){
        isProblem = true;
        test.push('"o2_rate" :'+o2_rate+',')
      }
      if(temperature < 10){
        isProblem = true
        test.push('"temperature" :'+temperature+',')
      }
      if(pressure>2){
        isProblem=true
        test.push('"pressure" :'+pressure+',')
      }
      if(cardiac_rythm> 160){
        isProblem= true
        test.push('"cardiac_rythm" :'+cardiac_rythm+',')
      }
      if(power<10){
        isProblem= true
        test.push('"power" :'+ power+',');
      }
    }
    else{
      if(o2_rate < 80 && spacesuit.o2_rate >= 80){
        isProblem = true;
        test.push('"o2_rate" :'+o2_rate+',')
      }
      if(temperature < 10  && spacesuit.temperature >= 10){
        isProblem = true
        test.push('"temperature" :'+temperature+',')
      }
      if(pressure>2  && spacesuit.pressure <=2){
        isProblem=true
        test.push('"pressure" :'+pressure+',')
      }
      if(cardiac_rythm> 160  && spacesuit.cardiac_rythm <= 160){
        isProblem= true
        test.push('"cardiac_rythm" :'+cardiac_rythm+',')
      }
      if(power<10  && spacesuit.power >= 10){
        isProblem= true
        test.push('"power" :'+ power+',');
      }

      this.spacesuits.forEach(s=>{
        if(s.spacesuit_id == id_spacesuit){
          s.spacesuit_id = id_spacesuit;
          s.o2_rate = o2_rate;
          s.cardiac_rythm = cardiac_rythm;
          s.temperature = temperature;
          s.power=power;
          s.pressure=pressure;
        }
      })
    }

    if(isProblem){
      let valueTest = '{'
      const producer = await this.kafka.producer()
      test.forEach(key=>{
        valueTest = valueTest + key;
      })

      valueTest = valueTest + '"astronaut_id": '+astonaut_id+',"spacesuit_id":'+ id_spacesuit+'}'
      // Producing
      await producer.connect()
      this.logger.log('Sending event to inform that the combinaison has bad vitals')
      this.logger.log(valueTest)
      await producer.send({
        topic: 'problem-spacesuit',
        messages: [
          {value: valueTest},
        ],
      });
      await producer.disconnect();
    }

  }

}
