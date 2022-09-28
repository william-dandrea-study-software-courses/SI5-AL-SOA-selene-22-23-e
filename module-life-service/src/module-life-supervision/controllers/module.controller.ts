import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { ModuleService } from '../services/module.service';

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";

import { NeedsDto } from "../dto/needs.dto";
import { SupplyDto } from "../dto/supply.dto";
import { ModuleLifeStatusDto} from '../dto/module-life-status.dto';
import { ModuleDto } from "../dto/module.dto";

@ApiTags('module-supervision')
@Controller('')
export class ModuleController {
  constructor(
    private readonly moduleService: ModuleService,
  ) {}

  @Get("/module")
  @ApiOkResponse()
  async getModules(): Promise<ModuleDto[]> {
    console.log("get modules");
    return this.moduleService.getModules();
  }

  @Get("/life-status")
  @ApiOkResponse({ type: Boolean })
  async getModuleLifeStatus(): Promise<ModuleLifeStatusDto[]> {
    console.log("get module life status")
    return this.moduleService.getModulesLifeStatus();
  }

  @Get("/needs")
  @ApiOkResponse({ type: Boolean })
  async getNeeds(): Promise<NeedsDto> {
    console.log("get needs")
    return this.moduleService.getNeeds();
  }

  @Post("/module")
  @ApiCreatedResponse({ description: 'The module has been successfully added.', type: ModuleDto })
  @ApiConflictResponse({ type: ModuleAlreadyExistsException, description: 'Id module already exists' })
  async postModule(@Body() moduleDto: ModuleDto) {
    console.log("post module")
    return this.moduleService.postModule(moduleDto);
  }

  @Post("/supply-needs")
  @HttpCode(200)
  @ApiOkResponse({})
  async supplyNeeds(@Body() supply : SupplyDto) {
    console.log("supply");
    await this.moduleService.supplyModule(supply);
  }
}
