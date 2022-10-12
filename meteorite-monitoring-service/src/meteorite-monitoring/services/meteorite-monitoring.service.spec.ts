import { Test, TestingModule } from '@nestjs/testing';
import { MeteoriteMonitoringService } from './meteorite-monitoring.service';

describe('SpacesuitService', () => {
  let service: MeteoriteMonitoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeteoriteMonitoringService],
    }).compile();

    service = module.get<MeteoriteMonitoringService>(MeteoriteMonitoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
