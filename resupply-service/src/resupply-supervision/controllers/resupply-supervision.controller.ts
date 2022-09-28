import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResupplySupervisionService } from '../services/resupply-supervision.service';
import { ResupplyMissionDto } from '../dto/resupply-mission.dto';
import { SupplyOrderDTO } from '../dto/supply-order.dto';

@ApiTags('resupply-supervision')
@Controller('/resupply-supervision')
export class ResupplySupervisionController {
  constructor(
    private readonly resupplySupervisionService: ResupplySupervisionService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Post('/supply')
  @HttpCode(200)
  async supply(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any> {
    return this.resupplySupervisionService.resupply(supplyOrderDTO);
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/rocketStatus')
  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    return this.resupplySupervisionService.retrieveResupplyMissionsStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/supplyOrders')
  async getResupplyOrder(): Promise<any> {
    return this.resupplySupervisionService.getResupplyOrder();
  }
}
