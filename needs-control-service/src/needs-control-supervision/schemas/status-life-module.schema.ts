import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NeedsDocument = Needs & Document;

@Schema({
  versionKey: false,
})
export class Needs {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  quantity: number;

}

export const NeedsSchema = SchemaFactory.createForClass(Needs);
