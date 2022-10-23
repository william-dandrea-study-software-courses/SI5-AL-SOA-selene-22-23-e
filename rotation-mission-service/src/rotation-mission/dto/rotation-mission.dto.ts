import {IsNotEmpty, IsEnum, IsString, IsArray} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class RotationMissionDto {

  @ApiProperty()
  @Prop({required:false})
  spacecraft_id: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @Prop({ type: [Number] })
  astronauts: number[];
}
