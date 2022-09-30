import { Module } from '@nestjs/common';
import { LifeSupportSupervisionController } from './controllers/life-support-supervision.controller';
import { LifeSupportSupervisionService } from './services/life-support-supervision.service';
import { ModuleLifeProxyService} from "./services/module-life-proxy.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [LifeSupportSupervisionController],
  providers: [LifeSupportSupervisionService, ModuleLifeProxyService],
  imports:[HttpModule]
})
export class LifeSupportSupervisionModule {}
