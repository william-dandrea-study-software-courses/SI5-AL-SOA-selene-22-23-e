import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {StatusSpacecraftEnumSchema} from "./status-spacecraft-enum.schema";

export type SpaceCraftDocument = SpaceCraft & Document;

@Schema({
  versionKey: false,
})
export class SpaceCraft {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_spacecraft: number;

  @ApiProperty()
  @Prop({ required: true })
  vitals: boolean;

  @ApiProperty()
  @Prop({ type: String, enum: StatusSpacecraftEnumSchema, required: true })
  status: StatusSpacecraftEnumSchema

  @ApiProperty()
  @Prop({required: false})
  id_resupplyMission: string;
}

export const SpacecraftSchema =
    SchemaFactory.createForClass(SpaceCraft);