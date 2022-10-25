import {IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewsDto {
  @ApiProperty()
  @IsNotEmpty()
  message: string;

}