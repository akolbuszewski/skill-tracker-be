import type { ExerciseResponseDto } from 'src/modules/exercises/dto/exercise-response.dto';

/** Workout step without nested exercise (list / lightweight responses). */
export type WorkoutStepSummaryDto = {
  id: string;
  exerciseId: string;
  order: number;
  plannedDurationSeconds: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/** Workout step with full exercise payload (detail / editor responses). */
export type WorkoutStepResponseDto = WorkoutStepSummaryDto & {
  exercise: ExerciseResponseDto;
};

export type WorkoutSummaryDto = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  steps: WorkoutStepSummaryDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutResponseDto = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  steps: WorkoutStepResponseDto[];
  createdAt: Date;
  updatedAt: Date;
};
