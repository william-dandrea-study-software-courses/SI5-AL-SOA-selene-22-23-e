import { Module } from '@nestjs/common';
import { ModuleLifeSupervisionController } from './controllers/module-life-supervision.controller';
import { ModuleLifeSupervisionService } from './services/module-life-supervision.service';

@Module({
  controllers: [ModuleLifeSupervisionController],
  providers: [ModuleLifeSupervisionService],
})
export class ModuleLifeSupervisionModule {}
