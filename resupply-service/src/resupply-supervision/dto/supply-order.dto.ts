import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SupplyOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
