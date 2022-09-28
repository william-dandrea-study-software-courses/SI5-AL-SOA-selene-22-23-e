import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LifeModuleDocument = LifeModule & Document;

@Schema({
  versionKey: false,
})
export class LifeModule {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_module: number;

  @ApiProperty()
  @Prop({ required: true })
  lifeStatus: boolean;

  @ApiProperty()
  @Prop({ required: true })
  needsStatus: boolean;
}

export const LifeModuleSchema =
    SchemaFactory.createForClass(LifeModule);