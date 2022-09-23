import { Injectable } from '@nestjs/common';
import { StatusLifeModuleDto } from '../dto/status-life-modules.dto';

@Injectable()
export class ModuleLifeSupervisionService {
  constructor() {
    const i = 0;
  }

  async modulesStatus(): Promise<StatusLifeModuleDto[]> {
    return [{ id_module: 1, status: true }];
  }
}
