import { Module } from '@nestjs/common';
import {RotationMissionController} from "./controllers/rotation-mission.controller";
import { RotationMissionService } from './services/rotation-mission.service';
import { HttpModule } from '@nestjs/axios';
import {MongooseModule} from "@nestjs/mongoose";
import {RotationMission, RotationMissionSchema} from "./schemas/rotation-mission.schema";


@Module({
  controllers: [RotationMissionController],
  providers: [RotationMissionService],
  imports:[HttpModule,MongooseModule.forFeature([{ name: RotationMission.name, schema: RotationMissionSchema } ]),]
})
export class RotationMissionModule {}
