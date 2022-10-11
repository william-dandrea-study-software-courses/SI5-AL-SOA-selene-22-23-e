import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ResupplySupervisionService } from "../services/resupply-supervision.service";
import { ResupplyMissionDto } from "../dto/resupply-mission.dto";
import { SupplyOrderDTO } from "../dto/supply-order.dto";
import { ResupplyMissionNotExist } from "../exceptions/resupply-mission-not-exist.exception";

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

  @ApiOkResponse({ type: Boolean })
  @Put("/:supplyOrderId/validate")
  @HttpCode(200)
  async validate(@Param("supplyOrderId") supplyOrder: string): Promise<any> {
    this.logger.log("Validation d'une commande");
    return this.resupplySupervisionService.validateOrder(supplyOrder);
  }

  @ApiOkResponse({ type: Boolean })
  @Put("/:resupplyMissionId/send")
  @ApiConflictResponse({
    type: ResupplyMissionNotExist,
    description: "Resupply mission does not exist",
  })
  @HttpCode(200)
  async send(
    @Param("resupplyMissionId") resupplyMissionId: string
  ): Promise<any> {
    this.logger.log("Envoie d'une fusée");
    return this.resupplySupervisionService.send(resupplyMissionId);
  }
}
