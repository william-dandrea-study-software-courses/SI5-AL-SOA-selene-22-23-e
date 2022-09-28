import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResupplySupervisionService } from '../services/resupply-supervision.service';
import {SupplyOrderDTO} from '../dto/supply-order.dto';

@ApiTags('resupply-supervision')
@Controller('/resupply-supervision')
export class ResupplySupervisionController {
  constructor(
    private readonly moduleLifeSupervisionService: ResupplySupervisionService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Post('/supply')
  @HttpCode(200)
  async supply(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any> {
    return this.moduleLifeSupervisionService.resupply(supplyOrderDTO);
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/')
  async getResupplyOrder(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any> {
    return this.moduleLifeSupervisionService.getResupplyOrder();
  }
}
