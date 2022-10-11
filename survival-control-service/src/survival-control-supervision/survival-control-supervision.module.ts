import { Module } from '@nestjs/common';
import { SurvivalControlSupervisionController } from './controllers/survival-control-supervision.controller';
import { SurvivalControlSupervisionService } from './services/survival-control-supervision.service';
import { ModuleLifeProxyService} from "./services/module-life-proxy.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [SurvivalControlSupervisionController],
  providers: [SurvivalControlSupervisionService, ModuleLifeProxyService],
  imports:[HttpModule]
})
export class SurvivalControlSupervisionModule {}
