import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MeteoriteDto {
    @ApiProperty()
    @IsNotEmpty()
    id_meteorite: number;

    @ApiProperty()
    @IsNotEmpty()
    dangerous: boolean;
}
