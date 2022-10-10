import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {Spacesuit, SpacesuitSchema} from './schemas/spacesuit.schema';

import { SpacesuitController } from './controllers/spacesuit.controller';
import { SpacesuitService } from './services/spacesuit.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Spacesuit.name, schema: SpacesuitSchema }])],
  controllers: [SpacesuitController],
  providers: [SpacesuitService],
})
export class SpacesuitModule {}