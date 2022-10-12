import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type VitalsModuleDocument = VitalsModule & Document;

@Schema({
    versionKey: false,
})
export class VitalsModule {

    @ApiProperty()
    @Prop({ required: true })
    co2_rate: number;

    @ApiProperty()
    @Prop({ required: true })
    co2_scrubbers_activated: boolean;

}

export const VitalsModuleSchema =
    SchemaFactory.createForClass(VitalsModule);