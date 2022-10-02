import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { LifeModule } from "../schemas/module.schema";
import {ApiProperty} from "@nestjs/swagger";

export class ModuleLifeStatusDto {
  constructor(x: LifeModule) {
    this.id_module = x.id_module;
    this.lifeStatus = x.lifeStatus;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  lifeStatus: boolean;
}
