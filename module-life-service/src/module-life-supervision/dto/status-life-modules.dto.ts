import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class StatusLifeModuleDto {
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
