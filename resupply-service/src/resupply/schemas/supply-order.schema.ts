import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {StatusSupplyOrderEnumSchema} from "./status-resupply-enum.schema";
import {Supply, SupplySchema} from "./supply.schema";

export type SupplyOrderDocument = SupplyOrder & Document;

@Schema({
  versionKey: false,
})
export class SupplyOrder {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: [SupplySchema] })
  supplies: Supply[];

  @ApiProperty()
  @Prop({ type: String, enum: StatusSupplyOrderEnumSchema })
  status: StatusSupplyOrderEnumSchema

}

export const SupplyOrderSchema = SchemaFactory.createForClass(SupplyOrder);
