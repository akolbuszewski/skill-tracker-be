import { UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { pipe, reduce, sort } from 'remeda';
import type { UserId } from 'src/common/types/ids';
import type { CreateWorkoutDto } from './dto/create-workout.dto';
import type { CreateWorkoutStepDto } from './dto/create-workout-step.dto';
import type { UpdateWorkoutDto } from './dto/update-workout.dto';

/** Rows Prisma accepts for nested `steps.create` / `createMany`. */
export type WorkoutStepCreateRow = {
  exerciseId: string;
  order: number;
  plannedDurationSeconds: number | null;
};

/**
 * Validates order is contiguous (0,1,2,…) after sort, maps DTO → Prisma step shape.
 */
export function validateAndMapWorkoutSteps(steps: CreateWorkoutStepDto[]): WorkoutStepCreateRow[] {
  if (steps.length === 0) {
    return [];
  }

  const sorted = pipe(steps, sort((a, b) => a.order - b.order));

  const validity = pipe(
    sorted,
    reduce(
      (acc, step, i) => {
        if (i === 0) {
          return { prevOrder: step.order, ok: true };
        }
        return {
          prevOrder: step.order,
          ok: acc.ok && step.order === acc.prevOrder + 1,
        };
      },
      { prevOrder: sorted[0]!.order, ok: true },
    ),
  );

  if (!validity.ok) {
    throw new UnprocessableEntityException('steps malformed');
  }

  return sorted.map((s) => ({
    exerciseId: s.exerciseId,
    order: s.order,
    plannedDurationSeconds:
      s.plannedDurationSeconds !== undefined ? s.plannedDurationSeconds : null,
  }));
}

/**
 * Create workout — no DTO spread into Prisma `data`.
 */
export function toWorkoutUncheckedCreateInput(
  userId: UserId,
  dto: CreateWorkoutDto,
): Prisma.WorkoutUncheckedCreateInput {
  const input: Prisma.WorkoutUncheckedCreateInput = {
    userId,
    name: dto.name,
    description: dto.description ?? null,
  };

  if (dto.steps !== undefined && dto.steps.length > 0) {
    input.steps = {
      create: validateAndMapWorkoutSteps(dto.steps),
    };
  }

  return input;
}

/**
 * Partial patch: only fields present on DTO. If `steps` is sent, replaces entire list (deleteMany + create).
 */
export function toWorkoutUpdateInput(dto: UpdateWorkoutDto): Prisma.WorkoutUpdateInput {
  const data: Prisma.WorkoutUpdateInput = {};

  if (dto.name !== undefined) {
    data.name = dto.name;
  }

  if (dto.description !== undefined) {
    data.description = dto.description;
  }

  if (dto.steps !== undefined) {
    data.steps = {
      deleteMany: {},
      create: validateAndMapWorkoutSteps(dto.steps),
    };
  }

  return data;
}

/**
 * PUT /workout/:id/steps — full replace of step list.
 */
export function toWorkoutStepsReplaceUpdateInput(
  steps: CreateWorkoutStepDto[],
): Prisma.WorkoutUpdateInput {
  return {
    steps: {
      deleteMany: {},
      create: validateAndMapWorkoutSteps(steps),
    },
  };
}
