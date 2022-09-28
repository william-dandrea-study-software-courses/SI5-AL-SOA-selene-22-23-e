import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ResupplyMissionOrderDocument = ResupplyMissionOrder & Document;

@Schema({
  versionKey: false,
})
export class ResupplyMissionOrder {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  quantity: number;
}

export const ResupplyMissionOrderSchema =
  SchemaFactory.createForClass(ResupplyMissionOrder);
