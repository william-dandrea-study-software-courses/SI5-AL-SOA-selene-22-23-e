import {IsArray, IsBoolean, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {VitalsModuleDto} from "./vitals-module.dto";
import {SupplyDTO} from "./supply.dto";
import {Prop} from "@nestjs/mongoose";
import {LifeModuleTypeEnumSchema} from "../schemas/life-module-type-enum";

export class LifeModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @ApiProperty()
  @Prop()
  type : LifeModuleTypeEnumSchema;

  @ApiProperty()
  @IsNotEmpty()
  vitals: VitalsModuleDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  supplies: SupplyDTO[];

  @ApiProperty()
  @Prop()
  astronauts: number[] = []

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isolated: boolean;
}
