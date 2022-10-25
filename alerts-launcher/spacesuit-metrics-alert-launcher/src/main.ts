import { NestFactory } from '@nestjs/core';
import { Kafka } from 'kafkajs';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";
import { AppService } from './app.service';

async function bootstrap() {

  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.enableCors();


  let kafka = new Kafka({
    clientId: 'module-life',
    brokers: ['kafka-service:9092']
  })

  const consumer = await kafka.consumer({groupId: "spacesuit"})
  await consumer.connect()

  await consumer.subscribe({ topic: 'spacesuits_topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      if (String(message.key) === "spacesuit_metrics" && String(topic) === "spacesuits_topic") {

        const spacesuitVitals: any = JSON.parse(String(message.value));
        const appService: AppService = new AppService();
        appService.processSpacesuitEvent(spacesuitVitals)
      }
    },
  });




  const port: number = Number(process.env.APP_PORT);
  await app.listen(port | 3000);
}
bootstrap();
