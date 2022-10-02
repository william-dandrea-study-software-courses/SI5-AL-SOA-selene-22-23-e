import { Test, TestingModule } from '@nestjs/testing';
import { LifeSupportSupervisionController } from './life-support-supervision.controller';

describe('ModuleLifeSupervisionController', () => {
  let controller: LifeSupportSupervisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifeSupportSupervisionController],
    }).compile();

    controller = module.get<LifeSupportSupervisionController>(LifeSupportSupervisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
