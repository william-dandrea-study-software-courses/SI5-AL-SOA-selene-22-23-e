import { Module } from '@nestjs/common';
import {ResupplyController} from "./controllers/resupply.controller";
import { ResupplyService } from './services/resupply.service';
import { HttpModule } from '@nestjs/axios';
import {MongooseModule} from "@nestjs/mongoose";
import {SupplyOrder, SupplyOrderSchema} from "./schemas/supply-order.schema";
import {ResupplyMissionOrder, ResupplyMissionOrderSchema} from "./schemas/resupply-mission-order.schema";


@Module({
  controllers: [ResupplyController],
  providers: [ResupplyService],
  imports:[HttpModule,MongooseModule.forFeature([{ name: SupplyOrder.name, schema: SupplyOrderSchema },{ name: ResupplyMissionOrder.name, schema: ResupplyMissionOrderSchema } ]),]
})
export class ResupplyModule {}
