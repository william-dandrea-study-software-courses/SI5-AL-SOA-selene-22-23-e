import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { TaskTypeEnumSchema } from "./task-type-enum.schema";

export type TaskDocument = Task & Document;

@Schema({
  versionKey: false,
})
export class Task {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_task: number;

  @ApiProperty()
  @Prop({ required: true })
  type: TaskTypeEnumSchema;

  @ApiProperty()
  @Prop({ required: true })
  date_begin: string;

  @ApiProperty()
  @Prop({ required: false })
  date_end: string | null;

  @ApiProperty()
  @Prop({ required: true })
  astronauts: number[];

  @ApiProperty()
  @Prop({ required: true })
  description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
