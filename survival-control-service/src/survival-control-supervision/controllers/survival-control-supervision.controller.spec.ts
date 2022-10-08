import { Test, TestingModule } from '@nestjs/testing';
import { SurvivalControlSupervisionController } from './survival-control-supervision.controller';

describe('ModuleLifeSupervisionController', () => {
  let controller: SurvivalControlSupervisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurvivalControlSupervisionController],
    }).compile();

    controller = module.get<SurvivalControlSupervisionController>(SurvivalControlSupervisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
