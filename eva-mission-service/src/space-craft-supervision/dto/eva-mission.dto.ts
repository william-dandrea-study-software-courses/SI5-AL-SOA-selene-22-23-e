import {IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EVAMissionDTO {
  @ApiProperty()
  @IsNotEmpty()
  id_mission: number;

  @ApiProperty()
  @IsNotEmpty()
  date_begin: string;

  @ApiProperty()
  @IsNotEmpty()
  date_end: string

  @ApiProperty()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  supervisor: string;

  @ApiProperty()
  @IsNotEmpty()
  notes: string;
}