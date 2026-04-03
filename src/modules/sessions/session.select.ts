import { Prisma } from '@prisma/client';
import { exerciseSelect } from 'src/modules/exercises/exercise.select';

export const taskSelect = {
  id: true,
  name: true,
  description: true,
  plannedDurationSeconds: true,
  actualDurationSeconds: true,
  status: true,
  notes: true,
  order: true,
  exerciseId: true,
  sessionId: true,
  exercise: { select: exerciseSelect },
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.TaskSelect;

export const sessionSelect = {
  id: true,
  userId: true,
  name: true,
  description: true,
  workoutId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  tasks: {
    orderBy: { order: 'asc' },
    select: taskSelect,
  },
} as const satisfies Prisma.SessionSelect;

export type SessionResponse = Prisma.SessionGetPayload<{
  select: typeof sessionSelect;
}>;
