import { Body, Controller, Get, HttpCode, Logger, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { NeedsControlServiceService } from "../services/needs-control-service.service";
import { NeedsDto } from "../dto/needs.dto";
import { SupplyOrderDto } from "../dto/supply-order.dto";

@ApiTags("needs-control-supervision")
@Controller("/needs-control-supervision")
export class NeedsControlServiceController {
  private readonly logger = new Logger(NeedsControlServiceController.name);

  constructor(
    private readonly moduleLifeSupervisionService: NeedsControlServiceService
  ) {
    // Initialize the stock
    this.moduleLifeSupervisionService.initializeStock();
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/stockBase")
  async superviseStockBase(): Promise<any> {
    this.logger.log("Récupère le stock de la base lunaire");
    return this.moduleLifeSupervisionService.stockBase();
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/fillStockBase")
  async fillStockBase(@Body() quantity: NeedsDto): Promise<any> {
    this.logger.log("Rempli le stock de la base lunaire");
    return this.moduleLifeSupervisionService.fillStockBase(quantity);
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/pickFromStockBase")
  async pickFromStockBase(@Body() quantity: NeedsDto): Promise<any> {
    this.logger.log("Prendre des ressources venant le stock de la base lunaire");
    return this.moduleLifeSupervisionService.pickFromStockBase(quantity);
  }


  @ApiOkResponse({ type: Boolean })
  @Get("/moduleNeeds")
  async superviseModuleStatus(): Promise<NeedsDto[]> {
    this.logger.log("Récupère les besoins des modules chez le service module");
    return this.moduleLifeSupervisionService.needsModules();
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
    return this.moduleLifeSupervisionService.supplyOrderToSent(supplyOrderDTO);
  }
}
