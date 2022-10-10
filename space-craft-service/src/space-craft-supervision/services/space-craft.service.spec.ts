import { Test, TestingModule } from '@nestjs/testing';
import { SpaceCraftService } from './space-craft.service';

describe('ModuleLifeSupervisionService', () => {
  let service: SpaceCraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceCraftService],
    }).compile();

    service = module.get<SpaceCraftService>(SpaceCraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
