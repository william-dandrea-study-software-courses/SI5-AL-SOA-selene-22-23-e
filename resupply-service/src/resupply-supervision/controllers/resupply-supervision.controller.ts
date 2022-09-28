import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResupplySupervisionService } from '../services/resupply-supervision.service';
import { ResupplyMissionDto } from '../dto/resupply-mission.dto';

@ApiTags('resupply-supervision')
@Controller('/resupply-supervision')
export class ResupplySupervisionController {
  constructor(
    private readonly resupplySupervisionService: ResupplySupervisionService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/')
  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    return this.resupplySupervisionService.retrieveResupplyMissionsStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/')
  async retrieveResupplyMissionsOrders(): Promise<ResupplyMissionDto[]> {
    return this.resupplySupervisionService.retrieveResupplyMissionsOrders();
  }
}
