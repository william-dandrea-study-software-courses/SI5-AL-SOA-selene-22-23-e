import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EVAMissionDocument = EVAMission & Document;

@Schema({
  versionKey: false,
})
export class EVAMission {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_mission: number;

  @ApiProperty()
  @Prop({ required: true })
  date_begin: string;

  @ApiProperty()
  @Prop({ required: false })
  date_end: string

  @ApiProperty()
  @Prop({required: false})
  status: boolean;

  @ApiProperty()
  @Prop({ required: true })
  supervisor: string;

  @ApiProperty()
  @Prop({ required: true })
  notes: string;
}

export const EvaMissionSchema =
    SchemaFactory.createForClass(EVAMission);