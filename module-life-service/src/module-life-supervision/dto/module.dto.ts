import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {StatusLifeModule} from "../schemas/status-life-module.schema";

export class ModuleDto {
  constructor(x: StatusLifeModule) {
    this.id_module = x.id_module;
    this.status = x.status;
  }

  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
