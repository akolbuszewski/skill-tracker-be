import { ApiProperty } from '@nestjs/swagger';

export class ResourceResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty({ type: String, nullable: true })
  title!: string | null;

  @ApiProperty()
  url!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

export class ExerciseResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    description: 'Rich text / TipTap JSON (Prisma Json); arbitrary object when set.',
  })
  descriptionRichText!: unknown | null;

  @ApiProperty()
  timeboxSeconds!: number;

  @ApiProperty({ type: [ResourceResponseDto] })
  resources!: ResourceResponseDto[];

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}
