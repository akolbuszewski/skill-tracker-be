import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateWorkoutStepDto } from './dto/create-workout-step.dto';
import { WorkoutResponseDto, WorkoutSummaryDto } from './dto/workout-response.dto';

/** OpenAPI for GET /workout/public — schema is {@link WorkoutSummaryDto} (single source in DTOs). */
export function OpenApiWorkoutPublicList() {
  return applyDecorators(
    ApiOperation({
      summary: 'List workouts (public)',
      description:
        'By default `includeExercises=false` — steps only include `exerciseId`. When `true`, each step includes the full nested `exercise` object; the schema below describes the default variant.',
    }),
    ApiQuery({
      name: 'includeExercises',
      required: false,
      type: Boolean,
      description: 'If true, include full exercise (and resources) on each step',
    }),
    ApiOkResponse({
      type: WorkoutSummaryDto,
      isArray: true,
      description: 'Array of workouts (shape as when includeExercises=false).',
    }),
  );
}

export function OpenApiWorkoutPublicListForUser() {
  return applyDecorators(
    ApiOperation({
      summary: "List a user's workouts (public)",
      description:
        'Same as GET /workout/public but filtered by `userId`. Default schema matches `includeExercises=false`.',
    }),
    ApiQuery({
      name: 'includeExercises',
      required: false,
      type: Boolean,
      description: 'If true, include full exercise (and resources) on each step',
    }),
    ApiOkResponse({
      type: WorkoutSummaryDto,
      isArray: true,
      description: 'Array of workouts (default variant without nested exercise on each step).',
    }),
  );
}

export function OpenApiWorkoutPublicGetOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get one workout (public)' }),
    ApiOkResponse({ type: WorkoutResponseDto }),
  );
}

export function OpenApiWorkoutCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create workout' }),
    ApiCreatedResponse({ type: WorkoutResponseDto }),
  );
}

export function OpenApiWorkoutListMine() {
  return applyDecorators(
    ApiOperation({
      summary: 'List my workouts',
      description:
        '`includeExercises=false` (default): same as public list. `true`: full shape with nested `exercise` on each step (like {@link WorkoutResponseDto}).',
    }),
    ApiQuery({
      name: 'includeExercises',
      required: false,
      type: Boolean,
      description: 'If true, full steps with nested exercise',
    }),
    ApiOkResponse({
      type: WorkoutSummaryDto,
      isArray: true,
      description: 'Default summary variant; with includeExercises=true the shape matches WorkoutResponseDto.',
    }),
  );
}

export function OpenApiWorkoutGetOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get workout details (owner)' }),
    ApiOkResponse({ type: WorkoutResponseDto }),
  );
}

export function OpenApiWorkoutUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Update workout' }),
    ApiOkResponse({ type: WorkoutResponseDto }),
  );
}

export function OpenApiWorkoutRemove() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete workout' }),
    ApiOkResponse({ type: WorkoutResponseDto }),
  );
}

export function OpenApiWorkoutReplaceSteps() {
  return applyDecorators(
    ApiOperation({ summary: 'Replace workout steps' }),
    ApiBody({ type: CreateWorkoutStepDto, isArray: true }),
    ApiOkResponse({ type: WorkoutResponseDto }),
  );
}
