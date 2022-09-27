import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class NeedsDto {

    constructor(x: NeedsDto) {
        this.id_module = x.id_module;
        this.needs = x.needs;
    }

    @IsNotEmpty()
    @IsNumber()
    id_module: number;

    @IsNotEmpty()
    @IsBoolean()
    needs: boolean;
}
