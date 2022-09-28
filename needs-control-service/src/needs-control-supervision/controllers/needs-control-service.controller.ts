import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { NeedsControlServiceService } from '../services/needs-control-service.service';
import {NeedsDto} from "../dto/needs.dto";
import {SupplyOrderDTO} from "../dto/supply-order.dto";

@ApiTags('needs-control-supervision')
@Controller('/needs-control-supervision')
export class NeedsControlServiceController {
  constructor(
    private readonly moduleLifeSupervisionService: NeedsControlServiceService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/moduleNeeds')
  async superviseModuleStatus(): Promise<NeedsDto[]> {
    console.log("supervise module status")
    return this.moduleLifeSupervisionService.needsModules();
  }

  @ApiOkResponse({type: Boolean})
  @HttpCode(200)
  @Post('/sendOrder')
  @ApiCreatedResponse({ description: 'The order has been successfully sent.', type: SupplyOrderDTO})
  async supplyOrder(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any>{
    console.log("supply Order")
    return this.moduleLifeSupervisionService.supplyOrderToSent(supplyOrderDTO)
  }
}