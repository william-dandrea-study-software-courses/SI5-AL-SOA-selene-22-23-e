import { Module } from '@nestjs/common';
import { ResupplySupervisionController } from './controllers/resupply-supervision.controller';
import { ResupplySupervisionService } from './services/resupply-supervision.service';

@Module({
  controllers: [ResupplySupervisionController],
  providers: [ResupplySupervisionService],
})
export class ResupplySupervisionModule {}
