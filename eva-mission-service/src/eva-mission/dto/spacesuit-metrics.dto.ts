import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EVAMissionTypeEnumSchema } from "../schemas/eva-mission-type-enum.schema";
import { SpacesuitMetrics } from "../schemas/spacesuit-metrics.schema";
import {Prop} from "@nestjs/mongoose";

export class SpacesuitMetricsDTO {
  @ApiProperty()
  @IsNotEmpty()
  id_spacesuit: number;

  @ApiProperty()
  @IsNotEmpty()
  o2_rate: number[];

  @ApiProperty()
  @IsNotEmpty()
  temperature: number[];

  @ApiProperty()
  @IsNotEmpty()
  pressure: number[];

  @ApiProperty()
  @IsNotEmpty()
  power: number[];
}
