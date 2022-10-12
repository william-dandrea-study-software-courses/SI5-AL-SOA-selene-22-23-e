import {IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AlertDto {
  @ApiProperty()
  @IsNotEmpty()
  id_alert: number;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  type: string

}