import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AlertDocument = Alert & Document;

@Schema({
  versionKey: false,
})
export class Alert {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_alert: number;

  @ApiProperty()
  @Prop({ required: true })
  message: string;

  @ApiProperty()
  @Prop({ required: false })
  type: string
}

export const AlertSchema =
    SchemaFactory.createForClass(Alert);