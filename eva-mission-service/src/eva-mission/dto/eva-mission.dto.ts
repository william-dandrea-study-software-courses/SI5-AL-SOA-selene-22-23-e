import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EVAMissionTypeEnumSchema } from "../schemas/eva-mission-type-enum.schema";
import { SpacesuitMetrics } from "../schemas/spacesuit-metrics.schema";
import {EVAMission} from "../schemas/eva-mission.schema";

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
  date_begin: Date;

  @ApiProperty()
  @IsNotEmpty()
  date_end: Date | null;

  @ApiProperty()
  @IsNotEmpty()
  supervisor: string;

  @ApiProperty()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  metrics: SpacesuitMetrics[];

  static evaMissionToDto(evaMission: EVAMission): EVAMissionDTO {
    const evaMissionDto: EVAMissionDTO = new EVAMissionDTO();
    evaMissionDto.id_mission = evaMission.id_mission;
    evaMissionDto.type = evaMission.type;
    evaMissionDto.date_begin = new Date(evaMission.date_begin);
    evaMissionDto.date_end =  new Date(evaMission.date_end);
    evaMissionDto.supervisor = evaMission.supervisor;
    evaMissionDto.notes = evaMission.notes;
    evaMissionDto.metrics = evaMission.metrics;

    return evaMissionDto;
  }
}
