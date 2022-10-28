import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { Kafka } from "kafkajs";

import { TaskPlannerService } from "../services/task-planner.service";
import { TaskPlannerDto } from "../dto/task-planner.dto";
import { TaskAlreadyExistsException } from "../exceptions/task-already-exists.exception";

@ApiTags("task-planner")
@Controller("task-planner")
export class TaskPlannerController {
  private readonly logger = new Logger(TaskPlannerController.name);

  constructor(private readonly taskPlannerService: TaskPlannerService) {}

  private kafka = new Kafka({
    clientId: "task-planner",
    brokers: ["kafka-service:9092"],
  });

  @Get("")
  @ApiOkResponse()
  async getTasksPlanned(): Promise<TaskPlannerDto[]> {
    this.logger.log("Récuperation des tâches définies");
    return this.taskPlannerService.getTasksPlanned();
  }

  @Post("")
  @ApiCreatedResponse({
    description: "The task has been successfully added.",
    type: TaskPlannerDto,
  })
  @ApiConflictResponse({
    type: TaskAlreadyExistsException,
    description: "Task already exists",
  })
  async postTaskPlanned(@Body() taskPlannedDTO: TaskPlannerDto) {
    this.logger.log("Création d'une nouvelle tâche");
    return this.taskPlannerService.postTaskPlanned(taskPlannedDTO);
  }

  @Put("/:taskPlannedId")
  @ApiOkResponse({
    description: "The task has been successfully updated.",
    type: TaskPlannerDto,
  })
  async putTaskPlanned(
    @Param("taskPlannedId") taskId: number,
    @Body() taskPlannerDTO: TaskPlannerDto
  ) {
    this.logger.log("Modification d'une tâche");
    return this.taskPlannerService.putTaskPlanned(taskId, taskPlannerDTO);
  }

  @Get("")
  @ApiOkResponse()
  async getCurrentTasksPlanned(): Promise<TaskPlannerDto[]> {
    this.logger.log("Récuperation des tâches planifiées non terminées");
    return this.taskPlannerService.getCurrentTasksPlanned();
  }
}
