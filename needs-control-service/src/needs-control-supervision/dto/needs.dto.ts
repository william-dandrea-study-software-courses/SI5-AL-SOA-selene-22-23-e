import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class NeedsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity = 0;
}
