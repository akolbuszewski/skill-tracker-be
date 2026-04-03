import { IsInt, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  exerciseId!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsInt()
  @Min(0)
  plannedDurationSeconds!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  description?: string;
}
