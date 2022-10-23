import {IsArray, IsNotEmpty } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {SupplyDTO} from "./supply.dto";

export class SupplyOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  supplies: SupplyDTO[];
}
