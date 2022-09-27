import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ModuleInDto {
    @IsNotEmpty()
    @IsNumber()
    id_module: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}