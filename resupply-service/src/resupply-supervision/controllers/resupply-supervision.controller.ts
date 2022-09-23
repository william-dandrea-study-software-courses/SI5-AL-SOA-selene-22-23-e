import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResupplySupervisionService } from '../services/resupply-supervision.service';
import { StatusLifeModuleDto } from '../dto/status-life-modules.dto';

@ApiTags('resupply-supervision')
@Controller('/resupply-supervision')
export class ResupplySupervisionController {
  constructor(
    private readonly moduleLifeSupervisionService: ResupplySupervisionService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/')
  async superviseModuleStatus(): Promise<StatusLifeModuleDto[]> {
    return this.moduleLifeSupervisionService.modulesStatus();
  }
}
