import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {VitalsModule, VitalsModuleSchema} from "./vitals-module.schema";
import {Supply, SupplySchema} from "./supply.schema";
import {LifeModuleTypeEnumSchema} from "./life-module-type-enum";

export type LifeModuleDocument = LifeModule & Document;

@Schema({
  versionKey: false,
})
export class LifeModule {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_module: number;

  @ApiProperty()
  @Prop()
  type : LifeModuleTypeEnumSchema;

  @ApiProperty()
  @Prop({ type: [VitalsModuleSchema] })
  vitals: VitalsModule;

  @ApiProperty()
  @Prop({ required: true, type: [SupplySchema] })
  supplies: Supply[];

  @ApiProperty()
  @Prop()
  astronauts: number[] = []

  @ApiProperty()
  @Prop({ required: true })
  isolated: boolean;
}

export const LifeModuleSchema =
    SchemaFactory.createForClass(LifeModule);