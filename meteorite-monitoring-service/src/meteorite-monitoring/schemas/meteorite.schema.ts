import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type MeteoriteDocument = Meteorite & Document;

@Schema({
    versionKey: false,
})
export class Meteorite {
    @ApiProperty()
    @Prop({ required: true, min: 0 })
    id_meteorite: number;

    @ApiProperty()
    @Prop({ required: true})
    dangerous: boolean;
}

export const MeteoriteSchema = SchemaFactory.createForClass(Meteorite);
