import { Module } from '@nestjs/common';
import { NewsFormalisationController } from './controllers/news-formalisation.controller';
import { NewsFormalisationService } from './services/news-formalisation.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [NewsFormalisationController],
  providers: [NewsFormalisationService],
  imports:[HttpModule]
})
export class NewsFormalisationModule {}
