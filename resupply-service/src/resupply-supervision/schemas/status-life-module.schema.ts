import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SupplyOrderDocument = SupplyOrder & Document;

@Schema({
  versionKey: false,
})
export class SupplyOrder {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_life_module: number;

  @ApiProperty()
  @Prop({ required: true })
  status: boolean;
}

export const SupplyOrderSchema =
  SchemaFactory.createForClass(SupplyOrder);
