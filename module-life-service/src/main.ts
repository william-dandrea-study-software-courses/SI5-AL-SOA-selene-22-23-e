import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {Kafka} from "kafkajs";

import { SwaggerUIConfig } from './shared/config/interfaces/swaggerui-config.interface';
import {ExpressSwaggerCustomOptions} from "@nestjs/swagger/dist/interfaces/legacy-swagger-custom-options.interfaces";


async function bootstrap() {

  let logger = new Logger();

  let kafka = new Kafka({
    clientId: 'module-life',
    brokers: ['kafka-service:9092']
  })

  const app = await NestFactory.create(AppModule);
  app.enableCors();

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
      .addServer('/module-life', 'Through gateway')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  const options : ExpressSwaggerCustomOptions = {customSiteTitle: swaggeruiConfig.title};
  SwaggerModule.setup(swaggeruiConfig.path, app, document, options);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  const consumer = await kafka.consumer({ groupId: 'test-group' });
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'alert-event', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.log(topic)
      logger.log(partition)
      logger.log(message.value)
    },
  });

  // Run the app
  const appPort = configService.get('app.port');
  await app.listen(appPort, () => {
    console.log('Listening on port ' + appPort);
  });
}

bootstrap();
