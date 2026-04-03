import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma.service';
import { asUserId } from 'src/common/types/ids';
import { WorkoutService } from '../workout/workout.service';
import { SessionsService } from './sessions.service';
import { sessionSelect } from './session.select';

describe('SessionsService', () => {
  let service: SessionsService;
  const prisma = {
    session: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  };
  const workoutService = { findOne: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        { provide: PrismaService, useValue: prisma },
        { provide: WorkoutService, useValue: workoutService },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll scopes by userId', async () => {
    prisma.session.findMany.mockResolvedValue([]);
    const userId = asUserId('user-1');

    await service.findAll(userId);

    expect(prisma.session.findMany).toHaveBeenCalledWith({
      where: { userId },
      select: sessionSelect,
    });
  });
});
