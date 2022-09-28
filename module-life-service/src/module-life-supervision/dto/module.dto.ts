import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {LifeModule} from "../schemas/module.schema";

export class ModuleDto {

    @IsNotEmpty()
    @IsNumber()
    id_module: number;

    @IsNotEmpty()
    @IsBoolean()
    lifeStatus: boolean;

    @IsNotEmpty()
    @IsBoolean()
    needsStatus: boolean;
}