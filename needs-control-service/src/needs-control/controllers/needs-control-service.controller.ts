import { Body, Controller, Get, HttpCode, Logger, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyOrderDto } from "../dto/supply-order.dto";
import {NeedsControlService} from "../services/needs-control.service";

@ApiTags("needs-control")
@Controller("/needs-control")
export class NeedsControlServiceController {
  private readonly logger = new Logger(NeedsControlServiceController.name);

  constructor(
    private readonly needsControlService: NeedsControlService
  ) {
  }




  @ApiOkResponse({ type: Boolean })
  @Get("/moduleNeeds")
  async superviseModuleStatus(): Promise<NeedsDto[]> {
    this.logger.log("Récupère les besoins des modules chez le service module");
    return this.needsControlService.needsModules();
  }

  @ApiOkResponse({ type: Boolean })
  @HttpCode(200)
  @Post("/sendOrder")
  @ApiCreatedResponse({
    description: "The order has been successfully sent.",
    type: SupplyOrderDto,
  })
  async supplyOrder(@Body() supplyOrderDTO: SupplyOrderDto): Promise<any> {
    this.logger.log("Envoie une commande vers le service resupply");
    return this.needsControlService.supplyOrderToSent(supplyOrderDTO);
  }
}
