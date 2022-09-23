import { Test, TestingModule } from '@nestjs/testing';
import { NeedsControlServiceController } from './needs-control-service.controller';

describe('ModuleLifeSupervisionController', () => {
  let controller: NeedsControlServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeedsControlServiceController],
    }).compile();

    controller = module.get<NeedsControlServiceController>(NeedsControlServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
