import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class VitalsModuleDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    co2_rate: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    co2_scrubbers_activated: boolean;
}
