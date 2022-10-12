import { Test, TestingModule } from '@nestjs/testing';
import { SpacecraftService } from './spacecraft.service';

describe('ModuleLifeService', () => {
  let service: SpacecraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpacecraftService],
    }).compile();

    service = module.get<SpacecraftService>(SpacecraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
