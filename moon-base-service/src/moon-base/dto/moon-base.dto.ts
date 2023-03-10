import {IsArray, IsNotEmpty, IsNumber, IsBoolean} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {MoonBase} from "../schemas/moon-base.schema";
import {SupplyDto} from "./supply.dto";

export class MoonBaseDto {

    constructor(moonBase: MoonBase) {
        this.id_base = moonBase.id_base;
        this.stock = moonBase.stock;
        this.alarm_on = moonBase.alarm_on;
        this.modules = moonBase.modules;
    }

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_base: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    stock: SupplyDto[];

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    alarm_on: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    modules: number[];

}
