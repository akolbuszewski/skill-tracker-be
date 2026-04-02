import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from './workout.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { asUserId } from 'src/common/types/ids';
import { workoutSelect } from './workout.select';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let prisma: { workout: { findFirst: jest.Mock; update: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      workout: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws 422 when steps order is invalid', async () => {
    const userId = asUserId('00000000-0000-0000-0000-000000000000');
    const workoutId = '11111111-1111-1111-1111-111111111111';

    prisma.workout.findFirst.mockResolvedValue({ id: workoutId });

    const steps = [
      { exerciseId: 'ex-1', order: 0, plannedDurationSeconds: 60 },
      { exerciseId: 'ex-2', order: 2, plannedDurationSeconds: 60 }, // gap (missing 1)
    ];

    await expect(service.replaceWorkoutSteps(userId, workoutId, steps)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
    expect(prisma.workout.update).not.toHaveBeenCalled();
  });

  it('happy path: updates when steps order is valid', async () => {
    const userId = asUserId('00000000-0000-0000-0000-000000000000');
    const workoutId = '11111111-1111-1111-1111-111111111111';

    const steps = [
      { exerciseId: 'ex-1', order: 0, plannedDurationSeconds: 60 },
      { exerciseId: 'ex-2', order: 1, plannedDurationSeconds: 60 },
    ];

    prisma.workout.findFirst.mockResolvedValue({ id: workoutId });
    prisma.workout.update.mockResolvedValue({ ok: true });

    await expect(service.replaceWorkoutSteps(userId, workoutId, steps)).resolves.toEqual({
      ok: true,
    });

    expect(prisma.workout.update).toHaveBeenCalledTimes(1);
    expect(prisma.workout.update).toHaveBeenCalledWith({
      where: {
        id: workoutId,
      },
      data: {
        steps: {
          deleteMany: {},
          create: [
            { exerciseId: 'ex-1', order: 0, plannedDurationSeconds: 60 },
            { exerciseId: 'ex-2', order: 1, plannedDurationSeconds: 60 },
          ],
        },
      },
      select: workoutSelect,
    });
  });
});
