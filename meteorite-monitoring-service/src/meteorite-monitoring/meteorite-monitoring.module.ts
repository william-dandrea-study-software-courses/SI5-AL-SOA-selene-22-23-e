import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {MeteoriteMonitoringController} from './controllers/meteorite-monitoring.controller';
import { MeteoriteMonitoringService } from './services/meteorite-monitoring.service';
import {HttpModule} from "@nestjs/axios";
import {Meteorite, MeteoriteSchema} from "./schemas/meteorite.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Meteorite.name, schema: MeteoriteSchema }]), HttpModule],
  controllers: [MeteoriteMonitoringController],
  providers: [MeteoriteMonitoringService],
})
export class MeteoriteMonitoringModule {}
