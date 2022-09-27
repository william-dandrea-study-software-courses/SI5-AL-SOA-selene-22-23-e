import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { NeedsControlServiceService } from '../services/needs-control-service.service';
import {NeedsNotExistException} from "../exceptions/module-already-exists.exception";
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
    return this.moduleLifeSupervisionService.needsModules();
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/needs')
  async getLocalNeeds(): Promise<NeedsDto[]> {
    return this.moduleLifeSupervisionService.needs();
  }


  @ApiOkResponse({type: Boolean})
  @HttpCode(200)
  @Post('/supplyOrder')
  @ApiCreatedResponse({ description: 'The order has been successfully sent.', type: SupplyOrderDTO})
  @ApiConflictResponse({ type: NeedsNotExistException, description: 'Id module already exists' })
  async supplyOrder(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any>{
    console.log(supplyOrderDTO)
    return this.moduleLifeSupervisionService.supplyOrderToSent(supplyOrderDTO)
  }
}