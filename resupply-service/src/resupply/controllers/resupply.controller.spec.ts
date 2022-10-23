import { Test, TestingModule } from '@nestjs/testing';
import { ResupplyController } from './resupply.controller';

describe('NewsFormalisationController', () => {
  let controller: ResupplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResupplyController],
    }).compile();

    controller = module.get<ResupplyController>(ResupplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
