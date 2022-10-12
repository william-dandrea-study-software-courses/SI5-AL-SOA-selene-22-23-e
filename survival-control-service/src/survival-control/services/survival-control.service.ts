import { Injectable } from '@nestjs/common';
import {ModuleLifeProxyService} from "./module-life-proxy.service";
import {ModuleDto} from "../dto/modules.dto";

@Injectable()
export class SurvivalControlService {
  constructor(private moduleLifeProxyService: ModuleLifeProxyService) {}

}
