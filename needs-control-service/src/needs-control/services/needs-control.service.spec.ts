import { Test, TestingModule } from '@nestjs/testing';
import { NeedsControlService } from './needs-control.service';

describe('ResupplyService', () => {
  let service: NeedsControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeedsControlService],
    }).compile();

    service = module.get<NeedsControlService>(NeedsControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
