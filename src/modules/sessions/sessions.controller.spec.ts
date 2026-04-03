import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma.service';
import { AuthGuard } from '../auth.guard';
import { WorkoutService } from '../workout/workout.service';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

describe('SessionsController', () => {
  let controller: SessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        SessionsService,
        { provide: PrismaService, useValue: {} },
        { provide: WorkoutService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SessionsController>(SessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
