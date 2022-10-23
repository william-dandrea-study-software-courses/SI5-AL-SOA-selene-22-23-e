import { Module } from '@nestjs/common';
import { SpacesuitMonitoringController } from './controllers/spacesuit-monitoring.controller';
import { SpacesuitMonitoringService } from './services/spacesuit-monitoring.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [SpacesuitMonitoringController],
  providers: [SpacesuitMonitoringService],
  imports:[HttpModule]
})
export class SpacesuitMonitoringModule {}
