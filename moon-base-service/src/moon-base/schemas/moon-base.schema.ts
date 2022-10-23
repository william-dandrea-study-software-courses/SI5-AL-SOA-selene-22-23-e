import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Supply, SupplySchema} from "./supply.schema";

export type MoonBaseDocument = MoonBase & Document;

@Schema({
    versionKey: false,
})
export class MoonBase {

    @ApiProperty()
    @Prop({ required: true })
    id_base: number;

    @ApiProperty()
    @Prop({ required: true, type: [SupplySchema] })
    stock: Supply[] = [];

    @ApiProperty()
    @Prop({required: true})
    alarm_on: boolean;

    @ApiProperty()
    @Prop({ required: true })
    modules: number[];
}

export const MoonBaseSchema = SchemaFactory.createForClass(MoonBase);
