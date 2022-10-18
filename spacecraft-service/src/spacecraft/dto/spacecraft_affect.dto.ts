import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {StatusSpacecraftEnumSchema} from "../schemas/status-spacecraft-enum.schema";

export class SpacecraftAffectDto {

    @ApiProperty({required:true})
    @IsNotEmpty()
    id_resupplyMission: string;
}
