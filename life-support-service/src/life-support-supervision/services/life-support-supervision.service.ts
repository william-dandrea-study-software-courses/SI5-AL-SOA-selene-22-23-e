import { Injectable } from '@nestjs/common';
import {ModuleLifeProxyService} from "./module-life-proxy.service";
import {ModuleDto} from "../dto/modules.dto";

@Injectable()
export class LifeSupportSupervisionService {
  constructor(private moduleLifeProxyService: ModuleLifeProxyService) {}

  async globalSuperviseModules(): Promise<boolean> {
    const moduleStatus: ModuleDto[] = await this.moduleLifeProxyService.superviseModules();
    let states = true;
    moduleStatus.forEach(module => {
        if(!module.lifeStatus){
          states = false
        }
    })
    return states;
  }
}
