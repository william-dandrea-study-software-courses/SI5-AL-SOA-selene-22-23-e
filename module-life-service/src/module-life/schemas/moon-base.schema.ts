import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {LifeModule} from "./life-module.schema";

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
    @Prop({ required: true })
    modules: LifeModule[];
}

export const MoonBaseSchema =
    SchemaFactory.createForClass(MoonBase);
