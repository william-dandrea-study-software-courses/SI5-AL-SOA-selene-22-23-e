import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {StatusSupplyOrderEnumSchema} from "../schemas/status-resupply-enum.schema";

export class SupplyOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

}
