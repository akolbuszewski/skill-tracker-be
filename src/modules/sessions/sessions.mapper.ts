import type { WorkoutStepResponseDto } from '../workout/dto/workout-response.dto';

/** Fields persisted on `Task` when materializing a session from a workout (snapshot + FK). */
export type TaskCreateForSession = {
  name: string;
  description?: string | null;
  plannedDurationSeconds: number;
  order: number;
  exerciseId: string;
};

export function buildTasksFromWorkout(steps: WorkoutStepResponseDto[]): TaskCreateForSession[] {
  return steps.map((step) => ({
    name: step.exercise.name,
    description: step.exercise.description,
    plannedDurationSeconds: step.plannedDurationSeconds ?? step.exercise.timeboxSeconds,
    order: step.order,
    exerciseId: step.exerciseId,
  }));
}
