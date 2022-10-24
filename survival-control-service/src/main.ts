import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {Logger, ValidationPipe} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerUIConfig } from './shared/config/interfaces/swaggerui-config.interface';
import {ExpressSwaggerCustomOptions} from "@nestjs/swagger/dist/interfaces/legacy-swagger-custom-options.interfaces";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Kafka} from "kafkajs";
import {AppService} from "./app.service";

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  let kafka = new Kafka({
    clientId: 'module-life',
    brokers: ['kafka-service:9092']
  })

  // Retrieve config service
  const configService = app.get(ConfigService);

  // Add validation pipe for all endpoints
  app.useGlobalPipes(new ValidationPipe());

  // Swagger UI Definition
  const swaggeruiConfig = configService.get<SwaggerUIConfig>('swaggerui');
  const config = new DocumentBuilder()
    .setTitle(swaggeruiConfig.title)
    .setDescription(swaggeruiConfig.description)
    .setVersion(configService.get('npm_package_version'))
    .addServer('/', 'Without gateway')
    .addServer('/survival-control', 'Through gateway')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options : ExpressSwaggerCustomOptions = {customSiteTitle: swaggeruiConfig.title};
  SwaggerModule.setup(swaggeruiConfig.path, app, document, options);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();



  const consumer = await kafka.consumer({groupId: "spacesuit_alert"})
  await consumer.connect()

  await consumer.subscribe({ topic: 'spacesuit_alert_topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      if (String(message.key) === "spacesuit_alert" && String(topic) === "spacesuit_alert_topic") {

        const spacesuitVitals: any = JSON.parse(String(message.value));
        logger.log(spacesuitVitals)
      }
    },
  });


  // Run the app
  const appPort = configService.get('app.port');
  await app.listen(appPort, () => {
    console.log('Listening on port ' + appPort);
  });
}

bootstrap();
