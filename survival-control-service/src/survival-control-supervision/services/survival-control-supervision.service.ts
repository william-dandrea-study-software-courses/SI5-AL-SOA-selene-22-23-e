import { Injectable } from '@nestjs/common';
import {ModuleLifeProxyService} from "./module-life-proxy.service";
import {ModuleDto} from "../dto/modules.dto";

@Injectable()
export class SurvivalControlSupervisionService {
  constructor(private moduleLifeProxyService: ModuleLifeProxyService) {}

}
