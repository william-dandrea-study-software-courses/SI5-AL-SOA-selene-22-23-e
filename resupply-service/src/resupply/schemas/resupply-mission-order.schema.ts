import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {StatusResupplyEnumSchema} from "./status-resupply-enum.schema";
import {SupplyOrder, SupplyOrderSchema} from "./supply-order.schema";

export type ResupplyMissionOrderDocument = ResupplyMissionOrder & Document;

@Schema({
  versionKey: false,
})
export class ResupplyMissionOrder {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: [SupplyOrderSchema] })
  orders: SupplyOrder[];

  @ApiProperty()
  @Prop({ type: String, enum: StatusResupplyEnumSchema })
  state: StatusResupplyEnumSchema

  @ApiProperty()
  @Prop({required:false})
  spacecraft_id: string;
}

export const ResupplyMissionOrderSchema =
  SchemaFactory.createForClass(ResupplyMissionOrder);
