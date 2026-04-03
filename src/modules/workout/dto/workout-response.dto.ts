import { ApiProperty } from '@nestjs/swagger';
import { ExerciseResponseDto } from 'src/modules/exercises/dto/exercise-response.dto';

/** Workout step without nested exercise (list / lightweight responses). */
export class WorkoutStepSummaryDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  exerciseId!: string;

  @ApiProperty()
  order!: number;

  @ApiProperty({ type: Number, nullable: true })
  plannedDurationSeconds!: number | null;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

export class WorkoutStepResponseDto extends WorkoutStepSummaryDto {
  @ApiProperty({ type: () => ExerciseResponseDto })
  exercise!: ExerciseResponseDto;
}

/** List payload — same class for TypeScript typing and Swagger (no separate schema file). */
export class WorkoutSummaryDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: String, nullable: true })
  description!: string | null;

  @ApiProperty({ type: [WorkoutStepSummaryDto] })
  steps!: WorkoutStepSummaryDto[];

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

export class WorkoutResponseDto extends WorkoutSummaryDto {
  @ApiProperty({ type: [WorkoutStepResponseDto] })
  declare steps: WorkoutStepResponseDto[];
}
