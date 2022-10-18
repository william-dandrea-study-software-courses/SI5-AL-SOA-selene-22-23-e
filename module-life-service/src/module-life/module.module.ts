import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { LifeModule, LifeModuleSchema } from './schemas/life-module.schema';

import { ModuleController } from './controllers/module.controller';
import { ModuleService } from './services/module.service';
import {VitalsModule, VitalsModuleSchema} from "./schemas/vitals-module.schema";
import {MoonBaseProxyService} from "./services/moon-base-proxy.service.spec";

@Module({
  imports: [MongooseModule.forFeature([
      { name: LifeModule.name, schema: LifeModuleSchema },
    { name: VitalsModule.name, schema: VitalsModuleSchema }
  ])],
  controllers: [ModuleController],
  providers: [ModuleService, MoonBaseProxyService],
})
export class ModuleModule {}
