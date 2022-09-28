import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { ModuleService } from '../services/module.service';

import { ModuleDto } from '../dto/module.dto';
import { ModuleInDto } from "../dto/module-in.dto";

import { ModuleAlreadyExistsException} from "../exceptions/module-already-exists.exception";
import {NeedsDto} from "../dto/needs.dto";

@ApiTags('module-life-supervision')
@Controller('')
export class ModuleController {
  private readonly logger = new Logger(ModuleController.name);

  constructor(
    private readonly moduleService: ModuleService,
  ) {}

  @Get("/status")
  @ApiOkResponse({ type: Boolean })
  async getModules(): Promise<ModuleDto[]> {
    this.logger.log("Récuperation du status des modules")
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
    this.logger.log("Récupération des besoins des modules")
    return this.moduleService.getNeeds().then(listDto =>{
      const response = new NeedsDto(listDto)
      return response
    });
  }

  @Post()
  @ApiCreatedResponse({ description: 'The module has been successfully added.', type: ModuleDto })
  @ApiConflictResponse({ type: ModuleAlreadyExistsException, description: 'Id module already exists' })
  async postModule(@Body() statusLifeModuleInDto: ModuleInDto) {
    this.logger.log("Création d'un nouveau module")
    return this.moduleService.postModule(statusLifeModuleInDto);
  }
}
