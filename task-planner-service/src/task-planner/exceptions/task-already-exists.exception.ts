import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskAlreadyExistsException extends HttpException {
  error: string;
  details: string;

  constructor(id_task: number) {
    super(
      { "Task already exists": `Task already exists for id : "${id_task}"` },
      HttpStatus.NOT_FOUND
    );
    this.error = "Task already exists";
    this.details = `Task already exists for id : "${id_task}"`;
  }
}
