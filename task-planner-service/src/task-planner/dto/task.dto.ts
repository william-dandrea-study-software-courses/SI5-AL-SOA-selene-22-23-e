import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskTypeEnumSchema } from "../schemas/task-type-enum.schema";

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty()
  id_task: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TaskTypeEnumSchema)
  type: TaskTypeEnumSchema;

  @ApiProperty()
  @IsNotEmpty()
  date_begin: Date;

  @ApiProperty()
  @IsNotEmpty()
  date_end: Date | null;

  @ApiProperty()
  @IsNotEmpty()
  astronauts: number[] = [];

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
