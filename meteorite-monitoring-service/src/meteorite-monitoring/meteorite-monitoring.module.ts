import { Module } from '@nestjs/common';
import { SurvivalControlController } from './controllers/meteorite-monitoring.controller';
import { MeteoriteMonitoringService } from './services/meteorite-monitoring.service';
import { ModuleLifeProxyService} from "./services/module-life-proxy.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [SurvivalControlController],
  providers: [MeteoriteMonitoringService, ModuleLifeProxyService],
  imports:[HttpModule]
})
export class MeteoriteMonitoringModule {}
