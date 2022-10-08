import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {VitalsModuleDto} from "./vitals-module.dto";

export class LifeModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @ApiProperty()
  @IsNotEmpty()
  vitals: VitalsModuleDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  supplies: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isolated: boolean;
}
