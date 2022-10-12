import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {SpaceCraft, SpacecraftSchema} from './schemas/spacecraft.schema';

import { SpacecraftController } from './controllers/spacecraft.controller';
import { SpacecraftService } from './services/spacecraft.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SpaceCraft.name, schema: SpacecraftSchema }])],
  controllers: [SpacecraftController],
  providers: [SpacecraftService],
})
export class SpacecraftModule {}