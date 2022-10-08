import { Test, TestingModule } from '@nestjs/testing';
import { SurvivalControlSupervisionService } from './survival-control-supervision.service';

describe('ModuleService', () => {
  let service: SurvivalControlSupervisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurvivalControlSupervisionService],
    }).compile();

    service = module.get<SurvivalControlSupervisionService>(SurvivalControlSupervisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
