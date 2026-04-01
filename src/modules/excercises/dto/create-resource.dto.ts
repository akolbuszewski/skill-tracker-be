import { ResourceType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateResourceDto {
  @IsEnum(ResourceType)
  type!: ResourceType;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title?: string;

  @IsUrl({ require_tld: false })
  @MaxLength(2048)
  url!: string;
}

