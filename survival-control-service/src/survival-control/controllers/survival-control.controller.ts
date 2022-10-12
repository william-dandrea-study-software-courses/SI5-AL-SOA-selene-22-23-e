import {Controller, Get, Logger, Param, Put} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { SurvivalControlService } from "../services/survival-control.service";
import { ModuleLifeProxyService } from "../services/module-life-proxy.service";

import { ModuleDto } from '../dto/modules.dto';

@ApiTags("survival-control")
@Controller("/survival-control")
export class SurvivalControlController {
  private readonly logger = new Logger(SurvivalControlController.name);

  constructor(
    private readonly survivalControlService: SurvivalControlService,
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
