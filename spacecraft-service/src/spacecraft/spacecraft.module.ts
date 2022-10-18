import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";

import {SpaceCraft, SpacecraftSchema} from './schemas/spacecraft.schema';

import { SpacecraftController } from './controllers/spacecraft.controller';
import { SpacecraftService } from './services/spacecraft.service';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: SpaceCraft.name, schema: SpacecraftSchema }])],
  controllers: [SpacecraftController],
  providers: [SpacecraftService],
})
export class SpacecraftModule {}