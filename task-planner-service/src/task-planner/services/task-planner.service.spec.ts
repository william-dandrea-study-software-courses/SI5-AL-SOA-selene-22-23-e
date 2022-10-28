import { Test, TestingModule } from '@nestjs/testing';
import { TaskPlannerService } from './task-planner.service';

describe('ModuleLifeService', () => {
  let service: TaskPlannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskPlannerService],
    }).compile();

    service = module.get<TaskPlannerService>(TaskPlannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
