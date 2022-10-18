import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EVAMissionTypeEnumSchema } from "../schemas/eva-mission-type-enum.schema";
import { SpacesuitMetrics } from "../schemas/spacesuit-metrics.schema";

export class EVAMissionDTO {
  @ApiProperty()
  @IsNotEmpty()
  id_mission: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EVAMissionTypeEnumSchema)
  type: EVAMissionTypeEnumSchema;

  @ApiProperty()
  @IsNotEmpty()
  date_begin: string;

  @ApiProperty()
  @IsNotEmpty()
  date_end: string;

  @ApiProperty()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  supervisor: string;

  @ApiProperty()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  metrics: SpacesuitMetrics[];
}
