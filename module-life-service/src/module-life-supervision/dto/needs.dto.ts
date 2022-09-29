import { IsNotEmpty, IsNumber } from "class-validator";
import { LifeModule } from "../schemas/module.schema";
import { ApiProperty } from "@nestjs/swagger";

export class NeedsDto {
  constructor(x: LifeModule[]) {
    x.forEach((module) => {
      if (module.supplies) {
        this.quantity += 1;
      }
    });
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity = 0;
}
