import { Prisma } from '@prisma/client';
import type { SelectForDto } from 'src/common/utils/select-for-dto';
import type { ExcerciseResponseDto } from './dto/excercise-response.dto';

export const excerciseSelect = {
  id: true,
  userId: true,
  name: true,
  description: true,
  descriptionRichText: true,
  timeboxSeconds: true,
  resources: {
    select: {
      id: true,
      type: true,
      title: true,
      url: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.ExerciseSelect & SelectForDto<ExcerciseResponseDto>;

export type ExcerciseResponse = Prisma.ExerciseGetPayload<{
  select: typeof excerciseSelect;
}>;

