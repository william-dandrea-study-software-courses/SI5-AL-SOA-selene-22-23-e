import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {EVAMission, EvaMissionSchema} from './schemas/eva-mission.schema';

import { EvaMissionController } from './controllers/eva-mission.controller';
import { EvaMissionService } from './services/eva-mission.service';
import {SpacesuitMetrics, SpacesuitMetricsSchema} from "./schemas/spacesuit-metrics.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: EVAMission.name, schema: EvaMissionSchema },{ name: SpacesuitMetrics.name, schema: SpacesuitMetricsSchema }])],
  controllers: [EvaMissionController],
  providers: [EvaMissionService],
})
export class EvaMissionModule {}