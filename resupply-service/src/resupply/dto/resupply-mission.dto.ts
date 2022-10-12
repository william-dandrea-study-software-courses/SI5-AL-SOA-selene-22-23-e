import {IsNotEmpty, IsEnum, IsString, IsArray} from 'class-validator';
import { StatusResupplyEnumSchema } from '../schemas/status-resupply-enum.schema';
import {SupplyOrderDTO} from "./supply-order.dto";

export class ResupplyMissionDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsArray()
  orders: SupplyOrderDTO[];

  @IsNotEmpty()
  @IsEnum(StatusResupplyEnumSchema)
  resupply_status: StatusResupplyEnumSchema;
}
