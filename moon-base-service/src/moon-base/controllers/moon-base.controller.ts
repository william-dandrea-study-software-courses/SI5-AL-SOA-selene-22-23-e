import {Controller, Get, Logger, Param, Post, Put, Body} from "@nestjs/common";
import { ApiOkResponse, ApiCreatedResponse, ApiConflictResponse, ApiTags } from "@nestjs/swagger";

import { MoonBaseService } from "../services/moon-base.service";
import {NewMoonBaseDto} from "../dto/new-moon-base.dto";
import {NeedsDto} from "../dto/needs.dto";
import {MoonBaseDto} from "../dto/moon-base.dto";
import {InventoryDto} from "../dto/inventory.dto";
import {MoonBaseAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import {SupplyDto} from "../dto/supply.dto";

@ApiTags("moon-base")
@Controller("/moon-base")
export class MoonBaseController {
  private readonly logger = new Logger(MoonBaseController.name);

  constructor(
    private readonly moonBaseService: MoonBaseService,

  ) {}

  @Get("/:moonBaseId")
  @ApiOkResponse()
  async getMoonBase(@Param("moonBaseId") moonBaseId: number): Promise<MoonBaseDto> {
    this.logger.log("Récuperation de la base lunaire");
    return this.moonBaseService.getMoonBase(moonBaseId);
  }

  @Get("/needs")
  @ApiOkResponse({ type: Boolean })
  async getNeeds(): Promise<NeedsDto> {
    this.logger.log("Récupération des besoins de la base lunaire");
    return this.moonBaseService.getNeeds();
  }

  @Get("/inventory")
  @ApiOkResponse({ type: InventoryDto })
  async getInventory(): Promise<InventoryDto> {
    this.logger.log("Récuperation de l'inventaire de la base");
    return this.moonBaseService.getInventory();
  }

  @Post("")
  @ApiCreatedResponse({
    description: "The moon base has been successfully added.",
    type: MoonBaseDto,
  })
  @ApiConflictResponse({
    type: MoonBaseAlreadyExistsException,
    description: "Id moon base already exists",
  })
  async postMoonBase(@Body() moonBaseDto: NewMoonBaseDto) {
    this.logger.log("Création d'un nouveau module");
    return this.moonBaseService.postMoonBase(moonBaseDto);
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/:moonBaseId/supply")
  async supplyMoonBase(@Body() quantity: SupplyDto, @Param('moonBaseId') moonBaseId: number): Promise<any> {
    this.logger.log("Remplissage le stock de la base lunaire");
    return this.moonBaseService.fillStockBase(quantity, moonBaseId);
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/pick")
  async pickStockMoonBase(@Body() quantity: NeedsDto, @Param('moonBaseId') moonBaseId: number): Promise<any> {
    this.logger.log("Suppression de " + quantity.quantity + " provisions du stock de la base lunaire");
    return this.moonBaseService.pickStockMoonBase(quantity, moonBaseId);
  }


  @Put("/:moonBaseId")
  @ApiOkResponse({
    description: "The moon base has been successfully updated.",
    type: MoonBaseDto,
  })
  async putMoonBase(
      @Param("moonBaseId") moonBaseId: number,
      @Body() moonBaseDto: NewMoonBaseDto
  ) {
    this.logger.log("Modification d'une la base lunaire");
    return this.moonBaseService.putMoonBase(moonBaseId, moonBaseDto);
  }

  @Put("/:moonBaseId/isolate")
  @ApiOkResponse({
    description: "The moon base has been successfully isolated",
    type: MoonBaseDto,
  })
  async isolateMoonBase(
      @Param("moonBaseId") moonBaseId: number
  ) {
    this.logger.log("Isolement de la base lunaire");
    return this.moonBaseService.isolateMoonBase(moonBaseId);
  }

  // @ApiOkResponse({ type: Boolean })
  // @Get("moonBase/:idBase")
  // async superviseStockBase(@Param('idBase') idBase: number): Promise<any> {
  //   this.logger.log("Récupère le stock de la base lunaire");
  //   return this.moduleService.getBase(idBase);
  // }
}
