import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskPlanner, TaskPlannerSchema } from "./schemas/task-planner.schema";

import { TaskPlannerController } from "./controllers/task-planner.controller";
import { TaskPlannerService } from "./services/task-planner.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskPlanner.name, schema: TaskPlannerSchema },
    ]),
  ],
  controllers: [TaskPlannerController],
  providers: [TaskPlannerService],
})
export class TaskPlannerModule {}
