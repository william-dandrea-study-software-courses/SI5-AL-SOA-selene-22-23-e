import { Test, TestingModule } from '@nestjs/testing';
import { ResupplyService } from './resupply.service';

describe('MeteoriteMonitoringService', () => {
  let service: ResupplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResupplyService],
    }).compile();

    service = module.get<ResupplyService>(ResupplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
