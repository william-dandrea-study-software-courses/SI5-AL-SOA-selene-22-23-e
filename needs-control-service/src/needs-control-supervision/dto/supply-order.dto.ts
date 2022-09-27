import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class SupplyOrderDTO {

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
