import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { ModuleService } from '../services/module.service';

import { ModuleDto } from '../dto/module.dto';
import { ModuleInDto } from "../dto/module-in.dto";

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import {NeedsDto} from "../dto/needs.dto";
import {StatusLifeModule} from "../schemas/status-life-module.schema";

@ApiTags('module-life-supervision')
@Controller('')
export class ModuleController {
  constructor(
    private readonly moduleService: ModuleService,
  ) {}

  @Get("/module")
  @ApiOkResponse({ type: Boolean })
  async getModules(): Promise<ModuleDto[]> {
    return this.moduleService.getModules().then(listDto =>{
      let response : ModuleDto[]=[];
      listDto.forEach(x => {
        response.push(new ModuleDto(x))
      })
      return response
    });
  }

  @Get("/needs")
  @ApiOkResponse({ type: Boolean })
  async getNeeds(): Promise<NeedsDto> {
    return this.moduleService.getNeeds().then(listDto =>{
      const response = new NeedsDto(listDto)
      return response
    });
  }

  @Post()
  @ApiCreatedResponse({ description: 'The module has been successfully added.', type: ModuleDto })
  @ApiConflictResponse({ type: ModuleAlreadyExistsException, description: 'Id module already exists' })
  async postModule(@Body() statusLifeModuleInDto: ModuleInDto) {
    return this.moduleService.postModule(statusLifeModuleInDto);
  }
}
