import { Module } from '@nestjs/common';

import { SpacecraftMonitoringController } from './controllers/spacecraft-monitoring.controller';
import { SpacecraftMonitoringService } from './services/spacecraft-monitoring.service';

@Module({
  imports: [],
  controllers: [SpacecraftMonitoringController],
  providers: [SpacecraftMonitoringService],
})
export class SpacecraftMonitoringModule {}
