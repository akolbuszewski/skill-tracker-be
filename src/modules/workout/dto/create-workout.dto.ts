import { Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreateWorkoutStepDto } from './create-workout-step.dto';

export class CreateWorkoutDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutStepDto)
  steps?: CreateWorkoutStepDto[];
}
