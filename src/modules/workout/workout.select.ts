import { Prisma } from '@prisma/client';
import type { SelectForDto } from 'src/common/utils/select-for-dto';
import type { WorkoutResponseDto } from './dto/workout-response.dto';

export const workoutSelect = {
  id: true,
  userId: true,
  name: true,
  description: true,
  steps: {
    select: {
      id: true,
      exerciseId: true,
      order: true,
      plannedDurationSeconds: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.WorkoutSelect & SelectForDto<WorkoutResponseDto>;

export type WorkoutResponse = Prisma.WorkoutGetPayload<{
  select: typeof workoutSelect;
}>;

