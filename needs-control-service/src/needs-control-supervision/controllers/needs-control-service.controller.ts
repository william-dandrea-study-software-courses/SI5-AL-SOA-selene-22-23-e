import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NeedsControlServiceService } from '../services/needs-control-service.service';
import {NeedsDto} from '../dto/status-life-modules.dto';

@ApiTags('needs-control-supervision')
@Controller('/needs-control-supervision')
export class NeedsControlServiceController {
  constructor(
    private readonly moduleLifeSupervisionService: NeedsControlServiceService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/moduleNeeds')
  async superviseModuleStatus(): Promise<NeedsDto[]> {
    return this.moduleLifeSupervisionService.needsModules();
  }
}
