import {IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {SpacesuitVitals} from "../schemas/spacesuit-vitals.schema";


export class SpacesuitDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_spacesuit: number;

  @ApiProperty()
  @IsNumber()
  id_astronaut: number;

  @ApiProperty()
  current_vitals: SpacesuitVitals;
}


export class SpacesuitCreationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_spacesuit: number;

  /*
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cardiac_rythm: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  o2_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pressure: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  power: number;
  */
}
