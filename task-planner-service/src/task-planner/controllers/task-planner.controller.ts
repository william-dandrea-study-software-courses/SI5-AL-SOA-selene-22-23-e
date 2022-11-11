import {Body, Controller, Get, Logger, Param, Post, Put,} from "@nestjs/common";
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags,} from "@nestjs/swagger";

import {Kafka} from "kafkajs";

import {TaskPlannerService} from "../services/task-planner.service";
import {TaskDto} from "../dto/task.dto";
import {TaskAlreadyExistsException} from "../exceptions/task-already-exists.exception";
import {TaskTypeEnumSchema} from "../schemas/task-type-enum.schema";

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
  async getTasksPlanned(): Promise<TaskDto[]> {
    this.logger.log("Récuperation des tâches définies");
    return this.taskPlannerService.getTasksPlanned();
  }

  @Post("")
  @ApiCreatedResponse({
    description: "The task has been successfully added.",
    type: TaskDto,
  })
  @ApiConflictResponse({
    type: TaskAlreadyExistsException,
    description: "Task already exists",
  })
  async postTaskPlanned(@Body() taskPlannedDTO: TaskDto) {
    this.logger.log("Création d'une nouvelle tâche");
    return this.taskPlannerService.postTaskPlanned(taskPlannedDTO);
  }

  @Put("/:taskPlannedId")
  @ApiOkResponse({
    description: "The task has been successfully updated.",
    type: TaskDto,
  })
  async putTaskPlanned(
    @Param("taskPlannedId") taskId: number,
    @Body() taskPlannerDTO: TaskDto
  ) {
    this.logger.log("Modification d'une tâche");
    return this.taskPlannerService.putTaskPlanned(taskId, taskPlannerDTO);
  }

  @Get("")
  @ApiOkResponse()
  async getCurrentTasksPlanned(): Promise<TaskDto[]> {
    this.logger.log("Récuperation des tâches planifiées non terminées");
    return this.taskPlannerService.getCurrentTasksPlanned();
  }

  async eva_mission_created_listener(){
    const consumer = this.kafka.consumer({ groupId: 'task-planner-consumer' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'eva-mission-created'})

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log("Eva Mission has been created");
        let json = JSON.parse(message.value.toLocaleString());
        this.logger.log(json)
        const taskDto : TaskDto = this.getTaskFromJson(json);
        await this.taskPlannerService.postTaskPlanned(taskDto);
      },
    });
  }

  private getTaskFromJson(json: string) : TaskDto {
    const task = new TaskDto();
    task.id_task = json["id_mission"];
    task.type = TaskTypeEnumSchema.EXPLORATION;
    task.date_begin = json["date_begin"];
    task.date_end = json["date_end"];
    task.astronauts.push(json["supervisor"]);
    return task;
  }

}
