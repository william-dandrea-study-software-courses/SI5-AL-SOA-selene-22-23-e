import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EVAMissionTypeEnumSchema } from "../schemas/eva-mission-type-enum.schema";

export class EvaMissionInDTO {
    @ApiProperty()
    @IsNotEmpty()
    id_mission: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EVAMissionTypeEnumSchema)
    type: EVAMissionTypeEnumSchema;

    @ApiProperty()
    @IsNotEmpty()
    date_begin: Date;

    @ApiProperty()
    @IsNotEmpty()
    date_end: Date | null;

    @ApiProperty()
    @IsNotEmpty()
    supervisor: string;

    @ApiProperty()
    @IsNotEmpty()
    notes: string;

    @ApiProperty()
    @IsNotEmpty()
    spacesuits: number[] = [];

}
