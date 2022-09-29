import { Body, Controller, Get, HttpCode, Logger, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ResupplySupervisionService } from "../services/resupply-supervision.service";
import { ResupplyMissionDto } from "../dto/resupply-mission.dto";
import { SupplyOrderDTO } from "../dto/supply-order.dto";

@ApiTags("resupply-supervision")
@Controller("/resupply-supervision")
export class ResupplySupervisionController {
  private readonly logger = new Logger(ResupplySupervisionController.name);

  constructor(
    private readonly resupplySupervisionService: ResupplySupervisionService
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Post("/supply")
  @HttpCode(200)
  async supply(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any> {
    this.logger.log("Création de la DTO supply");
    return this.resupplySupervisionService.resupply(supplyOrderDTO);
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/rocketStatus")
  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    this.logger.log(
      "Récupération du statut des différentes missions de réapprovisionnement"
    );
    return this.resupplySupervisionService.retrieveResupplyMissionsStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/supplyOrders")
  async getResupplyOrder(): Promise<any> {
    this.logger.log("Récupération des commandes");
    return this.resupplySupervisionService.getResupplyOrder();
  }
}
