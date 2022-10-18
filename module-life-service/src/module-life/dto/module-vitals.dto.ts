import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { LifeModule } from "../schemas/life-module.schema";
import {ApiProperty} from "@nestjs/swagger";
import {VitalsModuleDto} from "./vitals-module.dto";

export class ModuleVitalsDto {
  constructor(x: LifeModule) {
    this.id_module = x.id_module;
    this.vitals = x.vitals;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @ApiProperty()
  @IsNotEmpty()
  vitals: VitalsModuleDto;
}
