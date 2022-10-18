import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type MoonBaseDocument = MoonBase & Document;

@Schema({
    versionKey: false,
})
export class MoonBase {

    @ApiProperty()
    @Prop({ required: true })
    id_base: number;

    @ApiProperty()
    @Prop({ required: true })
    stock: number;

    @ApiProperty()
    @Prop({required: true})
    alarm_on: boolean;

    @ApiProperty()
    @Prop({ required: true })
    modules: string[];
}

export const MoonBaseSchema =
    SchemaFactory.createForClass(MoonBase);
