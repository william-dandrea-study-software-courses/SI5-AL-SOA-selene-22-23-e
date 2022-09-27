import { Injectable } from '@nestjs/common';
import {ModuleLifeProxyService} from "./module-life-proxy.service";
import {StatusLifeModuleDto} from "../dto/status-life-modules.dto";

@Injectable()
export class LifeSupportSupervisionService {
  constructor(private moduleLifeProxyService: ModuleLifeProxyService) {}

  async globalSuperviseModules(): Promise<boolean> {
    const moduleStatus: StatusLifeModuleDto[] = await this.moduleLifeProxyService.superviseModules();
    moduleStatus.forEach(module => {
        if(!module.status){
          return false
        }
    })
    return true;
  }
}
