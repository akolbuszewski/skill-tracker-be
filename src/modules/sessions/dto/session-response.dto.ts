import type { ExerciseResponseDto } from 'src/modules/exercises/dto/exercise-response.dto';

/** Matches Prisma `SessionStatus` on `Session.status`. */
export type SessionStatusDto =
  | 'INITIATED'
  | 'IN_PROGRESS'
  | 'DONE'
  | 'USER_BREAK'
  | 'CANCELLED';

export type TaskStatusDto = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'SKIPPED';

/**
 * Task row for API responses. Persisted columns mirror DB; `exercise` is loaded via join
 * (current exercise definition — links, timebox, resources), not duplicated on `Task`.
 */
export type TaskResponseDto = {
  id: string;
  name: string;
  description: string | null;
  plannedDurationSeconds: number;
  actualDurationSeconds: number | null;
  status: TaskStatusDto;
  notes: string | null;
  order: number;
  exerciseId: string;
  sessionId: string;
  exercise: ExerciseResponseDto;
  createdAt: Date;
  updatedAt: Date;
};

export type SessionResponseDto = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  workoutId: string | null;
  status: SessionStatusDto;
  tasks: TaskResponseDto[];
  createdAt: Date;
  updatedAt: Date;
};
