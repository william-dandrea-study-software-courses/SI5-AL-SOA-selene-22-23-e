import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {SpacesuitVitals, SpacesuitVitalsSchema} from "./spacesuit-vitals.schema";

export type SpacesuitDocument = Spacesuit & Document;

@Schema({
  versionKey: false,
})
export class Spacesuit {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_spacesuit: number;

  @ApiProperty()
  @Prop({ required: false, min: 0 })
  id_astronaut: number;

  @ApiProperty({type: [SpacesuitVitalsSchema]})
  @Prop({ required: false })
  current_vitals: SpacesuitVitals;
}

export const SpacesuitSchema =
    SchemaFactory.createForClass(Spacesuit);
