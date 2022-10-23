import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RotationMissionDocument = RotationMission & Document;

@Schema({
  versionKey: false,
})
export class RotationMission {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({required:false})
  spacecraft_id: string;

  @ApiProperty()
  @Prop({ required: true })
  date: string;

  @ApiProperty()
  @Prop({ type: [Number] })
  astronauts: number[];

}

export const RotationMissionSchema = SchemaFactory.createForClass(RotationMission);
