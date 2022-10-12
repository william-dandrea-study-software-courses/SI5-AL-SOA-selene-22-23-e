import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AlertNotificationService } from "../services/alert-notification.service";
import {AlertDto} from "../dto/alert.dto";
import {EVAMisionAlreadyExistException} from "../exceptions/eva-mission-already-exist.exception";

@ApiTags("module")
@Controller("")
export class AlertNotificationController {
  private readonly logger = new Logger(AlertNotificationController.name);

  constructor(private readonly spaceCraftService: AlertNotificationService) {}

  @Get("/alerts")
  @ApiOkResponse()
  async getAlerts(): Promise<AlertDto[]> {
    this.logger.log("Récuperation des alertes");
    return this.spaceCraftService.getAlerts();
  }

  @Post("/alerts")
  @ApiCreatedResponse({
    description: "The alert has been successfully added.",
    type: AlertDto,
  })
  async postModule(@Body() alertDto: AlertDto) {
    this.logger.log("Création d'une nouvelle alerte");
    return this.spaceCraftService.postAlert(alertDto);
  }


}
