import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {AstronautPlanetEnumSchema} from "../schemas/astronaut-planet-enum.schema";
import {AstronautJobEnumSchema} from "../schemas/astronaut-job-enum.schema";

export class AstronautDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_astronaut: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  isDead: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AstronautJobEnumSchema)
  job: AstronautJobEnumSchema;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AstronautPlanetEnumSchema)
  planet: AstronautPlanetEnumSchema;
}
