import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SupplyOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
