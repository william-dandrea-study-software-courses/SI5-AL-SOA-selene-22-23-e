import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ModuleLifeSupervisionService } from '../services/module-life-supervision.service';
import { StatusLifeModuleDto } from '../dto/status-life-modules.dto';

@ApiTags('module-life-supervision')
@Controller('/module-life-supervision')
export class ModuleLifeSupervisionController {
  constructor(
    private readonly moduleLifeSupervisionService: ModuleLifeSupervisionService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/oui')
  async superviseModuleStatus(): Promise<StatusLifeModuleDto[]> {
    return this.moduleLifeSupervisionService.modulesStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/test')
  async testService2Service(): Promise<any> {
    return {test:true};
  }
}
