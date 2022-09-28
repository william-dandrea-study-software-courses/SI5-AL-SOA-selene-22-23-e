import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {LifeModule} from "../schemas/module.schema";

export class ModuleDto {
    constructor(x: LifeModule) {
        this.id_module = x.id_module;
        this.lifeStatus = x.lifeStatus;
        this.needsStatus = x.needsStatus;
    }

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