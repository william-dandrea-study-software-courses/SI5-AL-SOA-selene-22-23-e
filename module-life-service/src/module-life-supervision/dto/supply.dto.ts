import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SupplyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
