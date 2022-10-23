import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SpacesuitVitalsDto {
    @ApiProperty()
    @IsNotEmpty()
    cardiac_rythm: number;

    @ApiProperty()
    @IsNotEmpty()
    o2_rate: number;

    @ApiProperty()
    @IsNotEmpty()
    temperature: number;

    @ApiProperty()
    @IsNotEmpty()
    pressure: number;

    @ApiProperty()
    @IsNotEmpty()
    power: number;
}