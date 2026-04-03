import { Prisma } from '@prisma/client';
import { exerciseSelect } from 'src/modules/exercises/exercise.select';

/** Step row without joining Exercise (smaller payloads for lists). */
export const workoutStepSelectSummary = {
  id: true,
  exerciseId: true,
  order: true,
  plannedDurationSeconds: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.WorkoutStepSelect;

export const workoutSelectSummary = {
  id: true,
  userId: true,
  name: true,
  description: true,
  steps: { select: workoutStepSelectSummary },
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.WorkoutSelect;

/** Full workout with nested exercises (and resources) on each step — use for detail & writes. */
export const workoutSelect = {
  id: true,
  userId: true,
  name: true,
  description: true,
  steps: {
    select: {
      ...workoutStepSelectSummary,
      exercise: { select: exerciseSelect },
    },
  },
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.WorkoutSelect;

export type WorkoutSummaryRow = Prisma.WorkoutGetPayload<{
  select: typeof workoutSelectSummary;
}>;

export type WorkoutResponseRow = Prisma.WorkoutGetPayload<{
  select: typeof workoutSelect;
}>;
