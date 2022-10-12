import { Test, TestingModule } from '@nestjs/testing';
import { SurvivalControlService } from './survival-control.service';

describe('SpacesuitService', () => {
  let service: SurvivalControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurvivalControlService],
    }).compile();

    service = module.get<SurvivalControlService>(SurvivalControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
