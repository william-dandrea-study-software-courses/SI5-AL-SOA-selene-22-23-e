import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";

import {SpaceCraft, AstronautSchema} from './schemas/astronaut.schema';

import { AstronautController } from './controllers/astronaut.controller';
import { AstronautService } from './services/astronaut.service';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: SpaceCraft.name, schema: AstronautSchema }])],
  controllers: [AstronautController],
  providers: [AstronautService],
})
export class AstronautModule {}