import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SupplyDocument = Supply & Document;

@Schema({
    versionKey: false,
})
export class Supply {
    @ApiProperty()
    @Prop({ required: true, min: 0 })
    label: string;

    @ApiProperty()
    @Prop({ required: true, min: 0 })
    quantity: number;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);
