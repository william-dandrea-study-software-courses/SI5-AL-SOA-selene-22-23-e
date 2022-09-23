import { Test, TestingModule } from '@nestjs/testing';
import { LifeSupportSupervisionService } from './life-support-supervision.service';

describe('ModuleLifeSupervisionService', () => {
  let service: LifeSupportSupervisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeSupportSupervisionService],
    }).compile();

    service = module.get<LifeSupportSupervisionService>(LifeSupportSupervisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
