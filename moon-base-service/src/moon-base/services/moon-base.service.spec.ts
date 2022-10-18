import { Test, TestingModule } from '@nestjs/testing';
import { MoonBaseService } from './moon-base.service';

describe('SpacesuitService', () => {
  let service: MoonBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoonBaseService],
    }).compile();

    service = module.get<MoonBaseService>(MoonBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
