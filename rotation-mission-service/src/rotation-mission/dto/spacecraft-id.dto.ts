import {IsNotEmpty, IsEnum, IsString, IsArray} from 'class-validator';

export class SpacecraftIdDto {
    @IsNotEmpty()
    @IsNotEmpty()
    spacecraft_id: string;
}
