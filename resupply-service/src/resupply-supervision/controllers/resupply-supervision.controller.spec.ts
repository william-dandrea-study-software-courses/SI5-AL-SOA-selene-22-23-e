import { Test, TestingModule } from '@nestjs/testing';
import { ResupplySupervisionController } from './resupply-supervision.controller';

describe('LifeSupportSupervisionController', () => {
  let controller: ResupplySupervisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResupplySupervisionController],
    }).compile();

    controller = module.get<ResupplySupervisionController>(ResupplySupervisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
