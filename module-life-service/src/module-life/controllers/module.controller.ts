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
  ApiTags,
} from "@nestjs/swagger";

import { ModuleService } from "../services/module.service";

import { ModuleAlreadyExistsException } from "../exceptions/module-already-exists.exception";

import { SupplyDTO } from "../dto/supply.dto";
import { ModuleVitalsDto } from "../dto/module-vitals.dto";
import { LifeModuleDto } from "../dto/life-module.dto";
import { ModuleAlreadyIsolatedException } from "../exceptions/module-already-isolated.exception";
import {LifeModule} from "../schemas/life-module.schema";

@ApiTags("module")
@Controller("/module")
export class ModuleController {
  private readonly logger = new Logger(ModuleController.name);

  constructor(private readonly moduleService: ModuleService) {}

  @Get("")
  @ApiOkResponse()
  async getModules(): Promise<LifeModuleDto[]> {
    this.logger.log("Récuperation des modules");
    return this.moduleService.getModules();
  }

  @Get("/vitals")
  @ApiOkResponse()
  async getVitals(): Promise<ModuleVitalsDto[]> {
    this.logger.log("Récuperation des conditions de vie des modules");
    return this.moduleService.getVitals();
  }

  @Get("/needs")
  @ApiOkResponse()
  async getNeeds(): Promise<SupplyDTO[]> {
    this.logger.log("Récupération des besoins des modules");
    return this.moduleService.getNeeds();
  }

  @Get("/inventory")
  @ApiOkResponse()
  async getInventory(): Promise<SupplyDTO[]> {
    this.logger.log("Récuperation de l'inventaire de la base");
    return this.moduleService.getInventory();
  }

  @Get("/:moduleId")
  @ApiOkResponse({
    description: "The module was successfully retrieved.",
    type: LifeModule,
  })
  async getModule(
      @Param("moduleId") moduleId: number
  ) {
    this.logger.log("Récupération du module " + moduleId);
    return this.moduleService.getModule(moduleId);
  }

  @Post("")
  @ApiCreatedResponse({
    description: "The module has been successfully added.",
    type: LifeModule,
  })
  @ApiConflictResponse({
    type: ModuleAlreadyExistsException,
    description: "Id module already exists",
  })
  async postModule(@Body() moduleDto: LifeModuleDto) {
    this.logger.log("Création d'un nouveau module");
    if (moduleDto.vitals.co2_rate >= 75) {
      moduleDto.vitals.co2_scrubbers_activated = true;
    } else {
      moduleDto.vitals.co2_scrubbers_activated = false;
    }
    return this.moduleService.postModule(moduleDto);
  }

  @ApiOkResponse({ type: Boolean })
  @Post("/:moduleId/supply")
  async supplyModule(@Body() supplies: SupplyDTO[], @Param("moduleId") moduleId: number): Promise<any> {
    this.logger.log(`Reapprovisionnement du module ${moduleId}`)
    return await this.moduleService.supplyModule(supplies, moduleId)
  }

  @Put("/:moduleId")
  @ApiOkResponse({
    description: "The module has been successfully updated.",
    type: LifeModule,
  })
  async putModule(
    @Param("moduleId") moduleId: number,
    @Body() moduleDto: LifeModule
  ) {
    this.logger.log("Modification d'un nouveau module");
    if (moduleDto.vitals.co2_rate >= 75) {
      moduleDto.vitals.co2_scrubbers_activated = true;
    } else {
      moduleDto.vitals.co2_scrubbers_activated = false;
    }
    return this.moduleService.putModule(moduleId, moduleDto);
  }

  @Put("/:moduleId/isolate")
  @HttpCode(200)
  @ApiOkResponse({})
  @ApiConflictResponse({
    type: ModuleAlreadyIsolatedException,
    description: "Module already isolated",
  })
  async isolateModule(@Param("moduleId") moduleId: number) {
    this.logger.log("Isolement d'un module");
    await this.moduleService.isolateModule(moduleId);
  }

}
