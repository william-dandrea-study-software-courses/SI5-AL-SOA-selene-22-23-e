import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ModuleDto {
  constructor(x: ModuleDto) {
    this.id_module = x.id_module;
    this.status = x.status;
  }

  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
