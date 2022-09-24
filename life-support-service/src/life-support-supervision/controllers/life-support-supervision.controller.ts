import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LifeSupportSupervisionService } from '../services/life-support-supervision.service';
import { StatusLifeModuleDto } from '../dto/status-life-modules.dto';

@ApiTags('life-support-supervision')
@Controller('/life-support-supervision')
export class LifeSupportSupervisionController {
  constructor(
    private readonly moduleLifeSupervisionService: LifeSupportSupervisionService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/oui')
  async superviseModuleStatus(): Promise<StatusLifeModuleDto[]> {
    return this.moduleLifeSupervisionService.modulesStatus();
  }
}
