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
  @IsNumber()
  supplies: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isolated: boolean;
}
