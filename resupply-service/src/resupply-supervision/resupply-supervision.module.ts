import { Module } from '@nestjs/common';
import { ResupplySupervisionController } from './controllers/resupply-supervision.controller';
import { ResupplySupervisionService } from './services/resupply-supervision.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SupplyOrder, SupplyOrderSchema} from "./schemas/status-life-module.schema";

@Module({
  controllers: [ResupplySupervisionController],
  providers: [ResupplySupervisionService],
  imports:[MongooseModule.forFeature([{ name: SupplyOrder.name, schema: SupplyOrderSchema }]),]
})
export class ResupplySupervisionModule {}
