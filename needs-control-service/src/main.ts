import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {SwaggerUIConfig} from "./shared/config/interfaces/swaggerui-config.interface";
import {ExpressSwaggerCustomOptions} from "@nestjs/swagger/dist/interfaces/legacy-swagger-custom-options.interfaces";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

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
      .addServer('/needs-control', 'Through gateway')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  const options : ExpressSwaggerCustomOptions = {customSiteTitle: swaggeruiConfig.title};
  SwaggerModule.setup(swaggeruiConfig.path, app, document, options);

  app.enableShutdownHooks();

  // Run the app
  const appPort = configService.get('app.port');
  await app.listen(appPort, () => {
    console.log('Listening on port ' + appPort);
  });
}
bootstrap();


