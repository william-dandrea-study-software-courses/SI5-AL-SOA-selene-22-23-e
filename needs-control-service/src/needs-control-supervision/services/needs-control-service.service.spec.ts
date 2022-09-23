import { Test, TestingModule } from '@nestjs/testing';
import { NeedsControlServiceService } from './needs-control-service.service';

describe('ModuleLifeSupervisionService', () => {
  let service: NeedsControlServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeedsControlServiceService],
    }).compile();

    service = module.get<NeedsControlServiceService>(NeedsControlServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
