import { Prisma } from '@prisma/client';
import type { SelectForDto } from 'src/common/utils/select-for-dto';
import type { ExerciseResponseDto } from './dto/exercise-response.dto';

export const exerciseSelect = {
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
} as const satisfies Prisma.ExerciseSelect & SelectForDto<ExerciseResponseDto>;

export type ExerciseResponse = Prisma.ExerciseGetPayload<{
  select: typeof exerciseSelect;
}>;
