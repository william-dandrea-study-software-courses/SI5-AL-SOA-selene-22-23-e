import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ModuleDto {
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
