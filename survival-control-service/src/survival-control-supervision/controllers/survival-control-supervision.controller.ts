import {Controller, Get, Logger, Param, Put} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HttpService } from "@nestjs/axios";

import { SurvivalControlSupervisionService } from "../services/survival-control-supervision.service";
import { ModuleLifeProxyService } from "../services/module-life-proxy.service";

import { ModuleDto } from '../dto/modules.dto';

@ApiTags("survival-control-supervision")
@Controller("/supervision")
export class SurvivalControlSupervisionController {
  private readonly logger = new Logger(SurvivalControlSupervisionController.name);

  constructor(
    private readonly survivalControlSupervisionService: SurvivalControlSupervisionService,
    private readonly moduleLifeProxyService: ModuleLifeProxyService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get("/")
  async supervise(): Promise<ModuleDto[]> {
    this.logger.log("Récupération du statut de chacun des modules");
    return this.moduleLifeProxyService.superviseModules();
  }

  @ApiOkResponse({ type: Boolean })
  @Put('/:moduleId/isolate')
  async isolateModule(@Param("moduleId") moduleId: number): Promise<string> {
    this.logger.log('Isolement d\'un module');
    return this.moduleLifeProxyService.isolateModule(moduleId);

  }
}
