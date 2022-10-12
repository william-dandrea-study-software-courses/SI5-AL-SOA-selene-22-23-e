import {IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {StatusSpacecraftEnumSchema} from "../schemas/status-spacecraft-enum.schema";

export class SpaceCraftDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_spacecraft: number;

  @ApiProperty()
  @IsNotEmpty()
  vitals: boolean;

  @ApiProperty()
  @IsNotEmpty()
  status: StatusSpacecraftEnumSchema;

  @ApiProperty({required:false})
  @IsNotEmpty()
  id_resupplyMission: string;
}