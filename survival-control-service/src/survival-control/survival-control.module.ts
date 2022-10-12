import { Module } from '@nestjs/common';
import { SurvivalControlController } from './controllers/survival-control.controller';
import { SurvivalControlService } from './services/survival-control.service';
import { ModuleLifeProxyService} from "./services/module-life-proxy.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [SurvivalControlController],
  providers: [SurvivalControlService, ModuleLifeProxyService],
  imports:[HttpModule]
})
export class SurvivalControlModule {}
