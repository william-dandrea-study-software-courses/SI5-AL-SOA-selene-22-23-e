import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {StatusSpacecraftEnumSchema} from "../schemas/status-spacecraft-enum.schema";

export class SpacecraftDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_spacecraft: number;

  @ApiProperty()
  @IsNotEmpty()
  vitals: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StatusSpacecraftEnumSchema)
  status: StatusSpacecraftEnumSchema;

  @ApiProperty({required:false})
  id_resupplyMission: string;

  @ApiProperty({required:false})
  id_rotationMissions: string[];
}
