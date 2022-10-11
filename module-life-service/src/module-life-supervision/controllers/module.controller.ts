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

  @Post("/supply-needs")
  @HttpCode(200)
  @ApiOkResponse({})
  async supplyNeeds(@Body() supply: SupplyDto) {
    this.logger.log("Réapprovisionnement des modules");
    await this.moduleService.supplyModule(supply);
  }
}
