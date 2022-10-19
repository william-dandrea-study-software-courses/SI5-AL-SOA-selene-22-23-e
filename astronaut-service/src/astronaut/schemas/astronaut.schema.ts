import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {AstronautPlanetEnumSchema} from "./astronaut-planet-enum.schema";
import {AstronautJobEnumSchema} from "./astronaut-job-enum.schema";

export type AstronautDocument = Astronaut & Document;

@Schema({
  versionKey: false,
})
export class Astronaut {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_astronaut: number;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  isDead: boolean;

  @ApiProperty()
  @Prop({ type: String, enum: AstronautJobEnumSchema, required: true })
  job: AstronautJobEnumSchema

  @ApiProperty()
  @Prop({ type: String, enum: AstronautPlanetEnumSchema, required: true })
  planet: AstronautPlanetEnumSchema

}

export const AstronautSchema =
    SchemaFactory.createForClass(Astronaut);