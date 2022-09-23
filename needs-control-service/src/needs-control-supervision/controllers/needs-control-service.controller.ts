import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NeedsControlServiceService } from '../services/needs-control-service.service';
import { StatusLifeModuleDto } from '../dto/status-life-modules.dto';

@ApiTags('module-life-supervision')
@Controller('/module-life-supervision')
export class NeedsControlServiceController {
  constructor(
    private readonly moduleLifeSupervisionService: NeedsControlServiceService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/oui')
  async superviseModuleStatus(): Promise<StatusLifeModuleDto[]> {
    return this.moduleLifeSupervisionService.modulesStatus();
  }
}
