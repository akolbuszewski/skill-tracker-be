import { ApiProperty } from '@nestjs/swagger';
import { SessionStatus, TaskStatus } from '@prisma/client';
import { ExerciseResponseDto } from 'src/modules/exercises/dto/exercise-response.dto';

/** Matches Prisma `Session.status` (OpenAPI enum). */
export type SessionStatusDto = SessionStatus;

/** Matches Prisma `Task.status` (OpenAPI enum). */
export type TaskStatusDto = TaskStatus;

export class TaskResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: String, nullable: true })
  description!: string | null;

  @ApiProperty()
  plannedDurationSeconds!: number;

  @ApiProperty({ type: Number, nullable: true })
  actualDurationSeconds!: number | null;

  @ApiProperty({ enum: TaskStatus })
  status!: TaskStatus;

  @ApiProperty({ type: String, nullable: true })
  notes!: string | null;

  @ApiProperty()
  order!: number;

  @ApiProperty({ format: 'uuid' })
  exerciseId!: string;

  @ApiProperty({ format: 'uuid' })
  sessionId!: string;

  @ApiProperty({ type: () => ExerciseResponseDto })
  exercise!: ExerciseResponseDto;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

export class SessionResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: String, nullable: true })
  description!: string | null;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  workoutId!: string | null;

  @ApiProperty({ enum: SessionStatus })
  status!: SessionStatus;

  @ApiProperty({ type: [TaskResponseDto] })
  tasks!: TaskResponseDto[];

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}
