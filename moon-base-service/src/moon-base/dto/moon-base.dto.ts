import {IsArray, IsNotEmpty, IsNumber, IsBoolean} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MoonBaseDto {

    constructor(initialStock, id_base, listOfModuleIds, alarm_on) {
        this.initialStock = initialStock;
        this.id_base = id_base;
        this.alarm_on = alarm_on;
        this.listOfModuleIds = listOfModuleIds;
    }

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    initialStock: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_base: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    listOfModuleIds: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    alarm_on: boolean;
}
