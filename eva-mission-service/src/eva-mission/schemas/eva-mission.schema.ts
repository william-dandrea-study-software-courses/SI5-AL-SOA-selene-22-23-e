import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {EVAMissionTypeEnumSchema} from "./eva-mission-type-enum.schema";
import {SpacesuitMetrics, SpacesuitMetricsSchema} from "./spacesuit-metrics.schema";

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
  type: EVAMissionTypeEnumSchema;

  @ApiProperty()
  @Prop({ required: true })
  date_begin: string;

  @ApiProperty()
  @Prop({ required: false })
  date_end: string | null;

  @ApiProperty()
  @Prop({ required: true })
  supervisor: string;

  @ApiProperty()
  @Prop({ required: true })
  notes: string;

  @ApiProperty()
  @Prop({ required: true, type: [SpacesuitMetricsSchema] })
  metrics: SpacesuitMetrics[] = [];
}

export const EvaMissionSchema = SchemaFactory.createForClass(EVAMission);
