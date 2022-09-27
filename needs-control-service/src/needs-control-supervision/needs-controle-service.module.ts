import { Module } from '@nestjs/common';
import { NeedsControlServiceController } from './controllers/needs-control-service.controller';
import { NeedsControlServiceService } from './services/needs-control-service.service';
import {HttpModule} from "@nestjs/axios";


@Module({
  controllers: [NeedsControlServiceController],
  providers: [NeedsControlServiceService],
  imports:[HttpModule]
})
export class NeedsControleServiceModule {}
