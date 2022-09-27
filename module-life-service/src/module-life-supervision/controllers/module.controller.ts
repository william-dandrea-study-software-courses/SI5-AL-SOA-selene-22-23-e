import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { ModuleService } from '../services/module.service';

import { ModuleDto } from '../dto/module.dto';
import { ModuleInDto } from "../dto/module-in.dto";

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";

@ApiTags('module-life-supervision')
@Controller('/module')
export class ModuleController {
  constructor(
    private readonly moduleService: ModuleService,
  ) {}

  @Get()
  @ApiOkResponse({ type: Boolean })
  async getModules(): Promise<ModuleDto[]> {
    return this.moduleService.getModules();
  }

  @Post()
  @ApiCreatedResponse({ description: 'The module has been successfully added.', type: ModuleDto })
  @ApiConflictResponse({ type: ModuleAlreadyExistsException, description: 'Id module already exists' })
  async postModule(@Body() statusLifeModuleInDto: ModuleInDto) {
    return this.moduleService.postModule(statusLifeModuleInDto);
  }
}
