import {IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {SpacesuitVitalsDto} from "./spacesuit-vitals.dto";

export class SpacesuitDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_spacesuit: number;

  @ApiProperty({required:false})
  @IsNumber()
  id_astronaut: number;

  @ApiProperty()
  current_vitals:SpacesuitVitalsDto;


}

export class SpacesuitCreationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_spacesuit: number;
}

export class AffectAstronautDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_astronaut: number
}