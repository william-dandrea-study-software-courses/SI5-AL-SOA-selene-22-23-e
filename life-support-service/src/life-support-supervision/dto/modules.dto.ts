import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ModuleDto {
  @ApiProperty({ description: "The id of the Moon Module", minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @ApiProperty({ description: "Status of the Moon Module (true if status is UP, false if status is DOWN"})
  @IsNotEmpty()
  @IsBoolean()
  lifeStatus: boolean;
}
