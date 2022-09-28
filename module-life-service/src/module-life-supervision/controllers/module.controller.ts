import {Body, Controller, Get, HttpCode, Logger, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { ModuleService } from '../services/module.service';

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import {NeedsDto} from "../dto/needs.dto";

import { SupplyDto } from "../dto/supply.dto";
import { ModuleLifeStatusDto} from '../dto/module-life-status.dto';
import { ModuleDto } from "../dto/module.dto";

@ApiTags('module-supervision')
@Controller('')
export class ModuleController {
  private readonly logger = new Logger(ModuleController.name);

  constructor(
    private readonly moduleService: ModuleService,
  ) {}

  @Get("/module")
  @ApiOkResponse()
  async getModules(): Promise<ModuleDto[]> {
    this.logger.log("Récuperation des modules");
    return this.moduleService.getModules();
  }

  @Get("/life-status")
  @ApiOkResponse({ type: Boolean })
  async getModuleLifeStatus(): Promise<ModuleLifeStatusDto[]> {
    this.logger.log("Récuperation du status des modules");
    return this.moduleService.getModulesLifeStatus();
  }

  @Get("/needs")
  @ApiOkResponse({ type: Boolean })
  async getNeeds(): Promise<NeedsDto> {
    this.logger.log("Récupération des besoins des modules");
    return this.moduleService.getNeeds();
  }

  @Post("/module")
  @ApiCreatedResponse({ description: 'The module has been successfully added.', type: ModuleDto })
  @ApiConflictResponse({ type: ModuleAlreadyExistsException, description: 'Id module already exists' })
  async postModule(@Body() moduleDto: ModuleDto) {
    this.logger.log("Création d'un nouveau module");
    return this.moduleService.postModule(moduleDto);
  }

  @Post("/supply-needs")
  @HttpCode(200)
  @ApiOkResponse({})
  async supplyNeeds(@Body() supply : SupplyDto) {
    this.logger.log("Réapprovisionnement des modules");
    await this.moduleService.supplyModule(supply);
  }
}
