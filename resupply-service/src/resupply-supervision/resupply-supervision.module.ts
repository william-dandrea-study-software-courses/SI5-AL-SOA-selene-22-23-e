import { Module } from '@nestjs/common';
import { ResupplySupervisionController } from './controllers/resupply-supervision.controller';
import { ResupplySupervisionService } from './services/resupply-supervision.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ResupplySupervisionController],
  providers: [ResupplySupervisionService],
  imports: [HttpModule],
})
export class ResupplySupervisionModule {}
