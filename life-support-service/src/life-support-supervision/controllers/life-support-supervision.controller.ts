import { Controller, Get, Logger } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HttpService } from "@nestjs/axios";

import { LifeSupportSupervisionService } from "../services/life-support-supervision.service";
import { ModuleLifeProxyService } from "../services/module-life-proxy.service";

import { ModuleDto } from "../dto/modules.dto";

@ApiTags("life-support-supervision")
@Controller("/supervision")
export class LifeSupportSupervisionController {
  private readonly logger = new Logger(LifeSupportSupervisionController.name);

  constructor(
    private readonly moduleLifeSupervisionService: LifeSupportSupervisionService,
    private readonly moduleLifeProxyService: ModuleLifeProxyService,
    private readonly httpService: HttpService
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get("/global")
  async superviseModuleStatus(): Promise<boolean> {
    this.logger.log("Récupération du statut général des modules");
    return this.moduleLifeSupervisionService.globalSuperviseModules();
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/")
  async supervise(): Promise<ModuleDto[]> {
    this.logger.log("Récupération du statut de chacun des modules");
    return this.moduleLifeProxyService.superviseModules();
  }
}
