import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateWorkoutStepDto {
  @IsString()
  exerciseId!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  plannedDurationSeconds?: number;
}

