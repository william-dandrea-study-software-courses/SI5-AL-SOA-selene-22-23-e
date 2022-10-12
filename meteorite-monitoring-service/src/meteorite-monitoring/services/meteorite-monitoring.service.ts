import { Injectable } from '@nestjs/common';
import {ModuleLifeProxyService} from "./module-life-proxy.service";

@Injectable()
export class MeteoriteMonitoringService {
  constructor(private moduleLifeProxyService: ModuleLifeProxyService) {}

  async get(): Promise<string> {
    return "helloWorld !";
  }

  async post(): Promise<string> {
    return "helloWorld from post!";
  }
}
