import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class SupplyOrderDto {

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
