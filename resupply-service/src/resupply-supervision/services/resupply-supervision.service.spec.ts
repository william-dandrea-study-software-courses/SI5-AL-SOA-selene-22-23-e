import { Test, TestingModule } from '@nestjs/testing';
import { ResupplySupervisionService } from './resupply-supervision.service';

describe('SurvivalControlSupervisionService', () => {
  let service: ResupplySupervisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResupplySupervisionService],
    }).compile();

    service = module.get<ResupplySupervisionService>(ResupplySupervisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
