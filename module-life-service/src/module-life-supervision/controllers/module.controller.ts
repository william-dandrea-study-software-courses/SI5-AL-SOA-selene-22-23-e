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
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { ModuleService } from "../services/module.service";

import { ModuleAlreadyExistsException } from "../exceptions/module-already-exists.exception";
import { NeedsDto } from "../dto/needs.dto";

import { SupplyDto } from "../dto/supply.dto";
import { ModuleLifeStatusDto } from "../dto/module-life-status.dto";
import { LifeModuleDto } from "../dto/life-module.dto";
import { ModuleAlreadyIsolatedException } from "../exceptions/module-already-isolated.exception";
import { InventoryDto } from "../dto/inventory.dto";
import {NewMoonBaseDto} from "../dto/new-moon-base.dto";

@ApiTags("module-supervision")
@Controller("")
export class ModuleController {
  private readonly logger = new Logger(ModuleController.name);

  constructor(private readonly moduleService: ModuleService) {}

  @Get("/module")
  @ApiOkResponse()
  async getModules(): Promise<LifeModuleDto[]> {
    this.logger.log("Récuperation des modules");
    return this.moduleService.getModules();
  }

  @Post("/module")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: LifeModuleDto,
  })
  @ApiConflictResponse({
    type: ModuleAlreadyExistsException,
    description: "Id module already exists",
  })
  async postModule(@Body() moduleDto: LifeModuleDto) {
    this.logger.log("Création d'un nouveau module");
    if (moduleDto.vitals.co2_rate >= 75) {
      moduleDto.vitals.co2_scrubbers_activated;
    } else {
      !moduleDto.vitals.co2_scrubbers_activated;
    }
    return this.moduleService.postModule(moduleDto);
  }

  @Put("/module/:moduleId")
  @ApiOkResponse({
    description: "The module has been successfully updated.",
    type: LifeModuleDto,
  })
  async putModule(
    @Param("moduleId") moduleId: number,
    @Body() moduleDto: LifeModuleDto
  ) {
    this.logger.log("Modification d'un nouveau module");
    if (moduleDto.vitals.co2_rate >= 75) {
      moduleDto.vitals.co2_scrubbers_activated;
    } else {
      !moduleDto.vitals.co2_scrubbers_activated;
    }
    return this.moduleService.putModule(moduleId, moduleDto);
  }

  @Put("/module/:moduleId/isolate")
  @HttpCode(200)
  @ApiOkResponse({})
  @ApiConflictResponse({
    type: ModuleAlreadyIsolatedException,
    description: "Module already isolated",
  })
  async isolate(@Param("moduleId") moduleId: number) {
    this.logger.log("Isolement d'un module");
    await this.moduleService.isolate(moduleId);
  }

  @Get("/vitals")
  @ApiOkResponse({ type: Boolean })
  async getModuleLifeStatus(): Promise<ModuleLifeStatusDto[]> {
    this.logger.log("Récuperation du status des modules");
    return this.moduleService.getModulesLifeStatus();
  }

  @Get("/inventory")
  @ApiOkResponse({ type: InventoryDto })
  async getInventory(): Promise<InventoryDto> {
    this.logger.log("Récuperation de l'inventaire de la base");
    return this.moduleService.getInventory();
  }

  @Get("/needs")
  @ApiOkResponse({ type: Boolean })
  async getNeeds(): Promise<NeedsDto> {
    this.logger.log("Récupération des besoins des modules");
    return this.moduleService.getNeeds();
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/:moduleId/:baseId/supply")
  async supplyOneModule(@Body() supply: SupplyDto, @Param("moduleId") moduleId: number, @Param("baseId") baseId: number): Promise<any> {
    this.logger.log(`Reapprovisionnement du module ${moduleId} avec une quantité de ${supply.quantity}`)
    return await this.moduleService.supplyOneModule(supply, moduleId, baseId)
  }


  @Post("/supply-needs")
  @HttpCode(200)
  @ApiOkResponse({})
  async supplyNeeds(@Body() supply: SupplyDto) {
    this.logger.log("Réapprovisionnement des modules");
    return await this.moduleService.supplyModule(supply);
  }


  @ApiOkResponse({ type: Boolean })
  @Post("/createMoonBase")
  async createMoonBase(@Body() newMoonBaseDto: NewMoonBaseDto): Promise<any> {
    this.logger.log("Creation de la moonbase");
    return this.moduleService.createMoonBase(newMoonBaseDto);
  }


  @ApiOkResponse({ type: Boolean })
  @Get("moonBase/:idBase")
  async superviseStockBase(@Param('idBase') idBase: number): Promise<any> {
    this.logger.log("Récupère le stock de la base lunaire");
    return this.moduleService.getBase(idBase);
  }

  @ApiOkResponse({ type: Boolean })
  @Post(":idBase/fillStockBase")
  async fillStockBase(@Body() quantity: NeedsDto, @Param('idBase') idBase: number): Promise<any> {
    this.logger.log("Rempli le stock de la base lunaire");
    return this.moduleService.fillStockBase(quantity, idBase);
  }


}
