import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class NeedsDto {

    @IsNotEmpty()
    @IsNumber()
    quantity: number = 0;
}
