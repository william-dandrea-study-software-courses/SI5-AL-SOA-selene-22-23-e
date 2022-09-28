import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { StatusResupplyEnumSchema } from '../schemas/status-resupply-enum.schema';

export class ResupplyMissionDto {
  @IsNotEmpty()
  @IsNumber()
  id_fusee: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(StatusResupplyEnumSchema)
  resupply_status: StatusResupplyEnumSchema;
}
