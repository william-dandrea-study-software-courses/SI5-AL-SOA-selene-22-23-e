import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {StatusSupplyOrderEnumSchema} from "./status-resupply-enum.schema";

export type SupplyOrderDocument = SupplyOrder & Document;

@Schema({
  versionKey: false,
})
export class SupplyOrder {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  quantity: number;

  @ApiProperty()
  @Prop({ type: String, enum: StatusSupplyOrderEnumSchema })
  status: StatusSupplyOrderEnumSchema

}

export const SupplyOrderSchema = SchemaFactory.createForClass(SupplyOrder);
