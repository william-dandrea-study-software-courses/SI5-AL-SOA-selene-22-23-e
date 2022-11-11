import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import {
  Task,
  TaskDocument,
} from "../schemas/task.schema";

import { TaskDto } from "../dto/task.dto";
import { TaskAlreadyExistsException } from "../exceptions/task-already-exists.exception";
import { Kafka } from "kafkajs";
import { TaskPlannerController } from "../controllers/task-planner.controller";

@Injectable()
export class TaskPlannerService {
  private readonly logger = new Logger(TaskPlannerController.name);

  private kafka = new Kafka({
    clientId: "task-planner",
    brokers: ["kafka-service:9092"],
  });

  constructor(
    @InjectModel(Task.name)
    private taskPlannerModel: Model<TaskDocument>
  ) {}

  async getTasksPlanned(): Promise<TaskDto[]> {
    return this.taskPlannerModel.find().then((tasksPlanned) => {
      const response: TaskDto[] = [];
      tasksPlanned.forEach((taskPlanned) => {
        const dto = new TaskDto();
        dto.id_task = taskPlanned.id_task;
        dto.type = taskPlanned.type;
        dto.date_begin = new Date(taskPlanned.date_begin);
        dto.date_end = new Date(taskPlanned.date_end);
        dto.description = taskPlanned.description;
        dto.astronauts = taskPlanned.astronauts;
        response.push(dto);
      });
      return response;
    });
  }

  async postTaskPlanned(
    taskPlannerDto: TaskDto
  ): Promise<TaskDto> {
    const alreadyExists = await this.taskPlannerModel.find({
      id_task: taskPlannerDto.id_task,
    });
    if (alreadyExists.length > 0) {
      throw new TaskAlreadyExistsException(taskPlannerDto.id_task);
    }
    if (
      taskPlannerDto.type.valueOf() == "EXPLORATION" ||
      taskPlannerDto.type.valueOf() === "HELP"
    ) {
      const message: { value: any }[] = [];
      message.push({
        value:
          taskPlannerDto.id_task +
          taskPlannerDto.date_begin.valueOf() +
          taskPlannerDto.date_end.valueOf() +
          taskPlannerDto.astronauts.toString() +
          taskPlannerDto.description,
      });
      const producer = await this.kafka.producer();
      // Producing
      await producer.connect();
      await producer.send({
        topic: "eva-mission",
        messages: message,
      });
      await producer.disconnect();
    }
    return await this.taskPlannerModel
      .create(TaskDto)
      .then((value) => value)
      .catch((error) => null);
  }

  async putTaskPlanned(
    taskPlannerId: number,
    taskPlannerDto: TaskDto
  ): Promise<TaskDto> {
    const taskPlanner = await this.taskPlannerModel.findOne({
      id_task: taskPlannerId,
    });
    if (taskPlanner === null) {
      throw new HttpException("Task Planned not found", HttpStatus.NOT_FOUND);
    }
    taskPlanner.date_begin = taskPlannerDto.date_begin.toISOString();
    taskPlanner.date_end =
      taskPlannerDto.date_end === null
        ? null
        : new Date(taskPlanner.date_end).toISOString();
    taskPlanner.astronauts = taskPlannerDto.astronauts;
    taskPlanner.description = taskPlannerDto.description;
    return await taskPlanner
      .save()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return null;
      });
  }

  async getCurrentTasksPlanned(): Promise<TaskDto[]> {
    return this.taskPlannerModel.find().then((tasksPlanned) => {
      const response: TaskDto[] = [];
      tasksPlanned.forEach((taskPlanned) => {
        const dto = new TaskDto();
        if (
          dto.date_end == null ||
          dto.date_end.getDate() >= new Date().getDate()
        ) {
          dto.id_task = taskPlanned.id_task;
          dto.type = taskPlanned.type;
          dto.date_begin = new Date(taskPlanned.date_begin);
          dto.date_end = new Date(taskPlanned.date_end);
          dto.description = taskPlanned.description;
          dto.astronauts = taskPlanned.astronauts;
          response.push(dto);
        }
      });
      return response;
    });
  }
}
