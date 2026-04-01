export type WorkoutStepResponseDto = {
  id: string;
  exerciseId: string;
  order: number;
  plannedDurationSeconds: number | null;
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

