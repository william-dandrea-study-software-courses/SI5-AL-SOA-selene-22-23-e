import { Test, TestingModule } from '@nestjs/testing';
import { EvaMissionService } from './eva-mission.service';

describe('ModuleLifeService', () => {
  let service: EvaMissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaMissionService],
    }).compile();

    service = module.get<EvaMissionService>(EvaMissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
