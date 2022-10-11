import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {EVAMission, EvaMissionSchema} from './schemas/eva-mission.schema';

import { EvaMissionController } from './controllers/eva-mission.controller';
import { EvaMissionService } from './services/eva-mission.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: EVAMission.name, schema: EvaMissionSchema }])],
  controllers: [EvaMissionController],
  providers: [EvaMissionService],
})
export class EvaMissionModule {}