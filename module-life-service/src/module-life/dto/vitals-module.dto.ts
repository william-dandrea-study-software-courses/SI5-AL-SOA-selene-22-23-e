import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {VitalsModule} from "../schemas/vitals-module.schema";

export class VitalsModuleDto {
    constructor(x: VitalsModule) {
        this.co2_scrubbers_activated = x.co2_scrubbers_activated;
        this.co2_rate = x.co2_rate;
    }

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    co2_rate: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    co2_scrubbers_activated: boolean;
}
