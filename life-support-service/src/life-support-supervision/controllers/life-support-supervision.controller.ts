import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {  HttpService } from "@nestjs/axios";

import { LifeSupportSupervisionService } from '../services/life-support-supervision.service';
import {ModuleLifeProxyService} from "../services/module-life-proxy.service";

import { ModuleDto } from '../dto/modules.dto';

@ApiTags('life-support-supervision')
@Controller('/supervision')
export class LifeSupportSupervisionController {

  constructor(
    private readonly moduleLifeSupervisionService: LifeSupportSupervisionService,
    private readonly moduleLifeProxyService: ModuleLifeProxyService,
    private readonly httpService: HttpService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/global-supervise')
  async superviseModuleStatus(): Promise<boolean> {
    return this.moduleLifeSupervisionService.globalSuperviseModules();
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/supervise')
  async supervise(): Promise<ModuleDto[]> {
    return this.moduleLifeProxyService.superviseModules();
  }
}
