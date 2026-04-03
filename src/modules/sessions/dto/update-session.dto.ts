import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  description?: string;
}
