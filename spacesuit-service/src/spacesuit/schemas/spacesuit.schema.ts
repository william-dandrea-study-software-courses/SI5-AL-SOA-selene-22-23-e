import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {SpacesuitVitals} from "./spacesuit-vital.schema";

export type SpacesuitDocument = Spacesuit & Document;

@Schema({
  versionKey: false,
})
export class Spacesuit {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_spacesuit: number;

  @ApiProperty()
  @Prop({ required: true})
  id_astronaut: number;

  @ApiProperty()
  @Prop({required: true})
  current_vital: SpacesuitVitals;
}

export const SpacesuitSchema =
    SchemaFactory.createForClass(Spacesuit);