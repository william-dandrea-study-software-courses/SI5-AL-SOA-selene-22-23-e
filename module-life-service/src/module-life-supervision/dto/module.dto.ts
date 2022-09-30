import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  lifeStatus: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  supplies: boolean;
}
