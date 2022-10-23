import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SupplyDto {
  constructor(label : string, quantity: number) {
    this.label = label;
    this.quantity = quantity;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
