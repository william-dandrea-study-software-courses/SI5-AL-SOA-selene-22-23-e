import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { TaskPlannerTypeEnumSchema } from "./task-planner-type-enum.schema";

export type TaskPlannerDocument = TaskPlanner & Document;

@Schema({
  versionKey: false,
})
export class TaskPlanner {
  @ApiProperty()
  @Prop({ required: true, min: 0 })
  id_task: number;

  @ApiProperty()
  @Prop({ required: true })
  type: TaskPlannerTypeEnumSchema;

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

export const TaskPlannerSchema = SchemaFactory.createForClass(TaskPlanner);
