import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {News, NewsSchema} from './schemas/news.schema';

import { SpacecraftMonitoringController } from './controllers/spacecraft-monitoring.controller';
import { SpacecraftMonitoringService } from './services/spacecraft-monitoring.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
  controllers: [SpacecraftMonitoringController],
  providers: [SpacecraftMonitoringService],
})
export class NewsModule {}