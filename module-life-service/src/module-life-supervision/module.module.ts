import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { LifeModule, LifeModuleSchema } from './schemas/life-module.schema';

import { ModuleController } from './controllers/module.controller';
import { ModuleService } from './services/module.service';
import {VitalsModule, VitalsModuleSchema} from "./schemas/vitals-module.schema";
import {MoonBase, MoonBaseSchema} from "./schemas/moon-base.schema";

@Module({
  imports: [MongooseModule.forFeature([
      { name: LifeModule.name, schema: LifeModuleSchema },
    { name: VitalsModule.name, schema: VitalsModuleSchema },
    { name: MoonBase.name, schema: MoonBaseSchema }
  ])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
