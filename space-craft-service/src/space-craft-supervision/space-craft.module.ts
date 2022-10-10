import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {SpaceCraft, SpaceCraftSchema} from './schemas/space-craft.schema';

import { SpaceCraftController } from './controllers/space-craft.controller';
import { SpaceCraftService } from './services/space-craft.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SpaceCraft.name, schema: SpaceCraftSchema }])],
  controllers: [SpaceCraftController],
  providers: [SpaceCraftService],
})
export class SpaceCraftModule {}