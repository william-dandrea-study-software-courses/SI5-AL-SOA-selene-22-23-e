import {Controller, Get, Logger, Param, Post} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { MeteoriteMonitoringService } from "../services/meteorite-monitoring.service";


@ApiTags("meteorite")
@Controller("meteorite")
export class MeteoriteMonitoringController {
  private readonly logger = new Logger(MeteoriteMonitoringController.name);

  constructor(private meteoriteMonitoringService: MeteoriteMonitoringService) {}

  @ApiOkResponse({ type: Boolean })
  @Get("")
  async get(): Promise<string> {
    this.logger.log("Get récupéré");
    return this.meteoriteMonitoringService.get();
  }

  @Post('')
  @ApiOkResponse({ type: Boolean })
  async isolateModule(@Param("moduleId") moduleId: number): Promise<string> {
    this.logger.log('Post récupéré');
    return this.meteoriteMonitoringService.post();

  }
}
