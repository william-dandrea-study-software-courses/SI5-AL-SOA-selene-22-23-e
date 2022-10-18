import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NeedsDto {
  constructor(quantity : number) {
    this.quantity = quantity;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity;
}
