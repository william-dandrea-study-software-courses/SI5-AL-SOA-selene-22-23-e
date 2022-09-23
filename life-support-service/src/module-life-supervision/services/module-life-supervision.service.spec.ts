import { Test, TestingModule } from '@nestjs/testing';
import { ModuleLifeSupervisionService } from './module-life-supervision.service';

describe('ModuleLifeSupervisionService', () => {
  let service: ModuleLifeSupervisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleLifeSupervisionService],
    }).compile();

    service = module.get<ModuleLifeSupervisionService>(ModuleLifeSupervisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
