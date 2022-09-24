import { Module } from '@nestjs/common';
import { NeedsControlServiceController } from './controllers/needs-control-service.controller';
import { NeedsControlServiceService } from './services/needs-control-service.service';

@Module({
  controllers: [NeedsControlServiceController],
  providers: [NeedsControlServiceService],
})
export class NeedsControleServiceModule {}
