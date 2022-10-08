import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { LifeModule, LifeModuleSchema } from './schemas/life-module.schema';

import { ModuleController } from './controllers/module.controller';
import { ModuleService } from './services/module.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: LifeModule.name, schema: LifeModuleSchema }])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}