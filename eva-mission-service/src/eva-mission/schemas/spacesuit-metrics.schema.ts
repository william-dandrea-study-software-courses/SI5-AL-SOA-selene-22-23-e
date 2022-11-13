import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type SpacesuitMetricsDocument = SpacesuitMetrics & Document;

@Schema({
  versionKey: false,
})
export class SpacesuitMetrics {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_spacesuit: number;

  @ApiProperty()
  @Prop({ required: true })
  o2_rate: number[] = [];

  @ApiProperty()
  @Prop({ required: false })
  temperature: number[] = [];

  @ApiProperty()
  @Prop({ required: false })
  pressure: number[] = [];

  @ApiProperty()
  @Prop({ required: true })
  power: number[] = [];
}

export const SpacesuitMetricsSchema = SchemaFactory.createForClass(SpacesuitMetrics);

