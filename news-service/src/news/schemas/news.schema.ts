import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NewsDocument = News & Document;

@Schema({
  versionKey: false,
})
export class News {

  @ApiProperty()
  @Prop({ required: true })
  message: string;
}

export const NewsSchema =
    SchemaFactory.createForClass(News);