import { Test, TestingModule } from '@nestjs/testing';
import { ModuleLifeSupervisionController } from './module-life-supervision.controller';

describe('ModuleLifeSupervisionController', () => {
  let controller: ModuleLifeSupervisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleLifeSupervisionController],
    }).compile();

    controller = module.get<ModuleLifeSupervisionController>(ModuleLifeSupervisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
