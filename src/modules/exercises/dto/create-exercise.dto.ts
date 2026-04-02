import { Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { CreateResourceDto } from './create-resource.dto';
import type { JsonInput } from 'src/common/types/json';

export class CreateExerciseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  description!: string;

  @IsOptional()
  @IsObject()
  descriptionRichText?: JsonInput;

  @IsInt()
  @Min(0)
  timeboxSeconds!: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateResourceDto)
  resources?: CreateResourceDto[];
}
