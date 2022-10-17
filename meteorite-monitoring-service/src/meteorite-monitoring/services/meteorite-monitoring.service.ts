import { Injectable } from '@nestjs/common';

@Injectable()
export class MeteoriteMonitoringService {
  constructor() {}

  async get(): Promise<string> {
    return "helloWorld !";
  }

  async post(): Promise<string> {
    return "helloWorld from post!";
  }
}
