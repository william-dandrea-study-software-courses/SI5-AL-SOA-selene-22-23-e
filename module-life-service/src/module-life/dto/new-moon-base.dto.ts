import {IsArray, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewMoonBaseDto {


    constructor(initialStock, id_base, listOfModuleIds) {
        this.initialStock = initialStock;
        this.id_base = id_base;
        this.listOfModuleIds = listOfModuleIds;
    }

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    initialStock;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_base;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    listOfModuleIds;


}
