import { Module } from '@nestjs/common';
import { LifeSupportSupervisionController } from './controllers/life-support-supervision.controller';
import { LifeSupportSupervisionService } from './services/life-support-supervision.service';

@Module({
  controllers: [LifeSupportSupervisionController],
  providers: [LifeSupportSupervisionService],
})
export class LifeSupportSupervisionModule {}
