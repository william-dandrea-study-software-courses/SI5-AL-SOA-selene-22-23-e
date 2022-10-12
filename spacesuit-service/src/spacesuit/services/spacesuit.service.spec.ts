import { Test, TestingModule } from '@nestjs/testing';
import { SpacesuitService } from './spacesuit.service';

describe('ModuleLifeService', () => {
  let service: SpacesuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpacesuitService],
    }).compile();

    service = module.get<SpacesuitService>(SpacesuitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
