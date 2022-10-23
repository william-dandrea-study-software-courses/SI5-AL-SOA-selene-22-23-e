import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SupplyDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
