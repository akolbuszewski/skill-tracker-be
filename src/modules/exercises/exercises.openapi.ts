import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExerciseResponseDto } from './dto/exercise-response.dto';

export function OpenApiExerciseCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create exercise' }),
    ApiCreatedResponse({ type: ExerciseResponseDto }),
  );
}

export function OpenApiExerciseListMine() {
  return applyDecorators(
    ApiOperation({ summary: 'List my exercises' }),
    ApiOkResponse({ type: ExerciseResponseDto, isArray: true }),
  );
}

export function OpenApiExerciseGetMine() {
  return applyDecorators(
    ApiOperation({ summary: 'Get one exercise (owner)' }),
    ApiOkResponse({ type: ExerciseResponseDto }),
  );
}

export function OpenApiExerciseUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Update exercise' }),
    ApiOkResponse({ type: ExerciseResponseDto }),
  );
}

export function OpenApiExerciseRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete exercise',
      description:
        'Response is the record returned by Prisma delete (mostly scalar fields; no `resources` array).',
    }),
    ApiOkResponse({ type: ExerciseResponseDto }),
  );
}

export function OpenApiExercisePublicList() {
  return applyDecorators(
    ApiOperation({ summary: 'List exercises (public)' }),
    ApiOkResponse({ type: ExerciseResponseDto, isArray: true }),
  );
}

export function OpenApiExercisePublicListForUser() {
  return applyDecorators(
    ApiOperation({ summary: "List a user's exercises (public)" }),
    ApiOkResponse({ type: ExerciseResponseDto, isArray: true }),
  );
}

export function OpenApiExercisePublicGetOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get one exercise (public)' }),
    ApiOkResponse({ type: ExerciseResponseDto }),
  );
}
