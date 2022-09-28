import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerUIConfig } from './shared/config/interfaces/swaggerui-config.interface';

async function bootstrap() {
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
    .addServer('/resupply', 'Through gateway')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggeruiConfig.path, app, document);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Run the app
  const appPort = configService.get('app.port');
  await app.listen(appPort, () => {
    console.log('Listening on port ' + appPort);
  });
}

bootstrap();
