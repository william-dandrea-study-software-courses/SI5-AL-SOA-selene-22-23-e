import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskPlannerTypeEnumSchema } from "../schemas/task-planner-type-enum.schema";

export class TaskPlannerDto {
  @ApiProperty()
  @IsNotEmpty()
  id_task: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TaskPlannerTypeEnumSchema)
  type: TaskPlannerTypeEnumSchema;

  @ApiProperty()
  @IsNotEmpty()
  date_begin: Date;

  @ApiProperty()
  @IsNotEmpty()
  date_end: Date | null;

  @ApiProperty()
  @IsNotEmpty()
  astronauts: number[];

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
