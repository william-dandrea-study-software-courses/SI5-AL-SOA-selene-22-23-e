import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LifeSupportSupervisionService } from '../services/life-support-supervision.service';
import { StatusLifeModuleDto } from '../dto/status-life-modules.dto';
import {HttpService} from "@nestjs/axios";
import {AxiosResponse} from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import {firstValueFrom} from "rxjs";

@ApiTags('life-support-supervision')
@Controller('/life-support-supervision')
export class LifeSupportSupervisionController {
  constructor(
    private readonly moduleLifeSupervisionService: LifeSupportSupervisionService,
    private readonly httpService: HttpService,
  ) {}

  @ApiOkResponse({ type: Boolean })
  @Get('/oui')
  async superviseModuleStatus(): Promise<StatusLifeModuleDto[]> {
    return this.moduleLifeSupervisionService.modulesStatus();
  }

  @ApiOkResponse({ type: Boolean })
  @Get('/test')
  async testService2Service(): Promise<any> {
    const rep : AxiosResponse = await firstValueFrom(this.httpService.get("http://"+process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT + '/module-life-supervision/test'));
    console.log(rep)
    return rep.data;
  }
}
