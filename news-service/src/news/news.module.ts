import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {News, NewsSchema} from './schemas/news.schema';

import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}