import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import type { TaskStatusDto } from './session-response.dto';

const TASK_STATUSES: readonly TaskStatusDto[] = ['PENDING', 'IN_PROGRESS', 'DONE', 'SKIPPED'];

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  actualDurationSeconds?: number;

  @IsOptional()
  @IsIn(TASK_STATUSES as readonly string[])
  status?: TaskStatusDto;
}
