import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import appConfig from "./shared/config/app.config";
import mongodbConfig from "./shared/config/mongodb.config";
import swaggeruiConfig from "./shared/config/swaggerui.config";
import {MongooseModule} from "@nestjs/mongoose";
import {MongooseConfigService} from "./shared/services/mongoose-config.service";
import {HealthModule} from "./health/health.module";
import {NeedsControleServiceModule} from "./needs-control-supervision/needs-controle-service.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mongodbConfig, swaggeruiConfig],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    HealthModule,
    NeedsControleServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
