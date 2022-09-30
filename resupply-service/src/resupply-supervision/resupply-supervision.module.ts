import { Module } from '@nestjs/common';
import { ResupplySupervisionController } from './controllers/resupply-supervision.controller';
import { ResupplySupervisionService } from './services/resupply-supervision.service';
import { HttpModule } from '@nestjs/axios';
import {MongooseModule} from "@nestjs/mongoose";
import {SupplyOrder, SupplyOrderSchema} from "./schemas/supply-order.schema";
import {ResupplyMissionOrder, ResupplyMissionOrderSchema} from "./schemas/resupply-mission-order.schema";

@Module({
  controllers: [ResupplySupervisionController],
  providers: [ResupplySupervisionService],
  imports:[HttpModule,MongooseModule.forFeature([{ name: SupplyOrder.name, schema: SupplyOrderSchema },{ name: ResupplyMissionOrder.name, schema: ResupplyMissionOrderSchema } ]),]
})
export class ResupplySupervisionModule {}
