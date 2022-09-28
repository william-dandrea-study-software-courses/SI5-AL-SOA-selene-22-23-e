import {Body, Controller, Get, HttpCode, Logger, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { NeedsControlServiceService } from '../services/needs-control-service.service';
import {NeedsDto} from "../dto/needs.dto";
import {SupplyOrderDTO} from "../dto/supply-order.dto";

@ApiTags('needs-control-supervision')
@Controller('/needs-control-supervision')
export class NeedsControlServiceController {
  private readonly logger = new Logger(NeedsControlServiceController.name);

  constructor(
    private readonly moduleLifeSupervisionService: NeedsControlServiceService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/moduleNeeds')
  async superviseModuleStatus(): Promise<NeedsDto[]> {
    this.logger.log("Récupère les besoins des modules chez le service module")
    return this.moduleLifeSupervisionService.needsModules();
  }

  @ApiOkResponse({type: Boolean})
  @HttpCode(200)
  @Post('/sendOrder')
  @ApiCreatedResponse({ description: 'The order has been successfully sent.', type: SupplyOrderDTO})
  async supplyOrder(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any>{
    this.logger.log("Envoie une commande vers le service resupply")
    return this.moduleLifeSupervisionService.supplyOrderToSent(supplyOrderDTO)
  }
}