import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { LifeModule } from "../schemas/module.schema";

export class ModuleLifeStatusDto {
  constructor(x: LifeModule) {
    this.id_module = x.id_module;
    this.lifeStatus = x.lifeStatus;
  }

  @IsNotEmpty()
  @IsNumber()
  id_module: number;

  @IsNotEmpty()
  @IsBoolean()
  lifeStatus: boolean;
}
