import { Module } from '@nestjs/common';
import {MeteoriteMonitoringController} from './controllers/meteorite-monitoring.controller';
import { MeteoriteMonitoringService } from './services/meteorite-monitoring.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [MeteoriteMonitoringController],
  providers: [MeteoriteMonitoringService],
  imports:[HttpModule]
})
export class MeteoriteMonitoringModule {}
