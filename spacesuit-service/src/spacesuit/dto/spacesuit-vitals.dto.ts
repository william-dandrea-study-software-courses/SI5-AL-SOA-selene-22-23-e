import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class SpacesuitVitalsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cardiac_rythm: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    o2_rate: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    temperature: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    pressure: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    power: number;
}
