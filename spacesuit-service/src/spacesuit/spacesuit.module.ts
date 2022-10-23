import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {Spacesuit, SpacesuitSchema} from './schemas/spacesuit.schema';

import { SpacesuitController } from './controllers/spacesuit.controller';
import { SpacesuitService } from './services/spacesuit.service';
import {SpacesuitVitals, SpacesuitVitalsSchema} from "./schemas/spacesuit-vitals.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Spacesuit.name, schema: SpacesuitSchema }]),
      MongooseModule.forFeature([{ name: SpacesuitVitals.name, schema: SpacesuitVitalsSchema }])
  ],
  controllers: [SpacesuitController],
  providers: [SpacesuitService],
})
export class SpacesuitModule {}
