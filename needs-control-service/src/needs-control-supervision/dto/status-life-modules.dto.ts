import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class NeedsDto {
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @IsNotEmpty()
  @IsBoolean()
  needs: boolean;
}
