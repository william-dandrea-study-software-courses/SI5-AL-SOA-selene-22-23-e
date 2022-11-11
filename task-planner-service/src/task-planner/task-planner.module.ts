import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Task, TaskSchema } from "./schemas/task.schema";

import { TaskPlannerController } from "./controllers/task-planner.controller";
import { TaskPlannerService } from "./services/task-planner.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [TaskPlannerController],
  providers: [TaskPlannerService],
})
export class TaskPlannerModule {}
