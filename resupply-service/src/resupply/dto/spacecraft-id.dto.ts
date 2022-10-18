import {IsNotEmpty, IsEnum, IsString, IsArray} from 'class-validator';
import { StatusResupplyEnumSchema } from '../schemas/status-resupply-enum.schema';
import {SupplyOrderDTO} from "./supply-order.dto";

export class SpacecraftIdDto {
    @IsNotEmpty()
    @IsNotEmpty()
    spacecraft_id: string;
}
