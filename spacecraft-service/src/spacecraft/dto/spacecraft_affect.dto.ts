import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SpacecraftAffectDto {

    @ApiProperty({required:true})
    @IsNotEmpty()
    id_resupplyMission: string;
}
