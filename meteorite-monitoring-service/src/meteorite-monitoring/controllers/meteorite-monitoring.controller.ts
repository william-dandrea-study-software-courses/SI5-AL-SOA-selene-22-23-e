import {Controller, Get, Logger, Param, Post, Body} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { MeteoriteMonitoringService } from "../services/meteorite-monitoring.service";
import {MeteoriteDto} from "../dto/meteorite.dto";
import {Meteorite} from "../schemas/meteorite.schema";


@ApiTags("meteorite")
@Controller("meteorite")
export class MeteoriteMonitoringController {
  private readonly logger = new Logger(MeteoriteMonitoringController.name);

  constructor(private meteoriteMonitoringService: MeteoriteMonitoringService) {}

  @ApiOkResponse({ type: Meteorite })
  @Get("")
  async getMeteorites(): Promise<Meteorite[]> {
    this.logger.log("Get all meteorites");
    return this.meteoriteMonitoringService.getMeteorites();
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/danger")
  async getMeteoriteDanger(): Promise<Boolean> {
    this.logger.log("Check if there are dangerous meteorites");
    return this.meteoriteMonitoringService.getMeteoriteDanger();
  }

  @Post('')
  @ApiOkResponse({ type: Meteorite })
  async postMeteorite(@Body() meteoriteDto: MeteoriteDto): Promise<Meteorite> {
    this.logger.log('Save new meteorite');
    return this.meteoriteMonitoringService.post(meteoriteDto);

  }
}
