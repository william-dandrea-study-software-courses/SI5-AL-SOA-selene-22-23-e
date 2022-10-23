import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SupplyDTO {
    constructor(label : string, quantity: number) {
        this.label = label;
        this.quantity = quantity;
    }

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
