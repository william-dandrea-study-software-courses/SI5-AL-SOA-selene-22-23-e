import {IsArray, IsNotEmpty, IsNumber, IsBoolean} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {SupplyDto} from "./supply.dto";

export class NewMoonBaseDto {
    constructor(initialStock, id_base, listOfModuleIds, alarm_on) {
        this.initialStock = initialStock;
        this.id_base = id_base;
        this.alarm_on = alarm_on;
        this.listOfModuleIds = listOfModuleIds;
    }

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    initialStock: SupplyDto[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_base: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    alarm_on: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    listOfModuleIds: number[];
}
