import { IsNotEmpty, IsNumber } from 'class-validator';

export class SupplyDto {

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
