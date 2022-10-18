import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { MoonBaseController } from './controllers/moon-base.controller';
import { MoonBaseService } from './services/moon-base.service';
import { ModuleLifeProxyService} from "./services/module-life-proxy.service";
import {HttpModule} from "@nestjs/axios";
import {MoonBase, MoonBaseSchema} from "./schemas/moon-base.schema";

@Module({
  controllers: [
    MongooseModule.forFeature([
      { name: MoonBase.name, schema: MoonBaseSchema }
    ]),
    MoonBaseController],
  providers: [MoonBaseService, ModuleLifeProxyService],
  imports:[HttpModule]
})
export class MoonBaseModule {}
