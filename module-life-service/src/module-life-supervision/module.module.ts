import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { StatusLifeModule, StatusLifeModuleSchema } from './schemas/status-life-module.schema';

import { ModuleController } from './controllers/module.controller';
import { ModuleService } from './services/module.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: StatusLifeModule.name, schema: StatusLifeModuleSchema }])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}