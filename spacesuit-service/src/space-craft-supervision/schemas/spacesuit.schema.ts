import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SpacesuitDocument = Spacesuit & Document;

@Schema({
  versionKey: false,
})
export class Spacesuit {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_spacesuit: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  cardiac_rythm: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  o2_rate: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  temperature: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  pressure: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  power: number;
}

export const SpacesuitSchema =
    SchemaFactory.createForClass(Spacesuit);