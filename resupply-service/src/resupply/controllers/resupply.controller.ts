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
import { ResupplyService } from "../services/resupply.service";
import { ResupplyMissionDto } from "../dto/resupply-mission.dto";
import { SupplyOrderDTO } from "../dto/supply-order.dto";
import { ResupplyMissionNotExist } from "../exceptions/resupply-mission-not-exist.exception";

@ApiTags("resupply")
@Controller("/resupply")
export class ResupplyController {
  private readonly logger = new Logger(ResupplyController.name);

  constructor(
    private readonly resupplyService: ResupplyService
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Post("/supply")
  @HttpCode(200)
  async supply(@Body() supplyOrderDTO: SupplyOrderDTO): Promise<any> {
    this.logger.log("Création de la DTO supply");
    return this.resupplyService.resupply(supplyOrderDTO);
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/rocketStatus")
  async retrieveResupplyMissionsStatus(): Promise<ResupplyMissionDto[]> {
    this.logger.log(
      "Récupération du statut des différentes missions de réapprovisionnement"
    );
    return this.resupplyService.retrieveResupplyMissionsStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get("/supplyOrders")
  async getResupplyOrder(): Promise<any> {
    this.logger.log("Récupération des commandes");
    return this.resupplyService.getResupplyOrder();
  }

  @ApiOkResponse({ type: Boolean })
  @Put("/:supplyOrderId/validate")
  @HttpCode(200)
  async validate(@Param("supplyOrderId") supplyOrder: string): Promise<any> {
    this.logger.log("Validation d'une commande");
    return this.resupplyService.validateOrder(supplyOrder);
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
    return this.resupplyService.send(resupplyMissionId);
  }
}
