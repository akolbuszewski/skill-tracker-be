import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { workoutSelect, workoutSelectSummary } from './workout.select';
import type { UserId } from 'src/common/types/ids';
import { CreateWorkoutStepDto } from './dto/create-workout-step.dto';
import {
  toWorkoutStepsReplaceUpdateInput,
  toWorkoutUncheckedCreateInput,
  toWorkoutUpdateInput,
} from './workout.mapper';
import type { WorkoutResponseDto, WorkoutSummaryDto } from './dto/workout-response.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: UserId, createWorkoutDto: CreateWorkoutDto): Promise<WorkoutResponseDto> {
    return await this.prisma.workout.create({
      data: toWorkoutUncheckedCreateInput(userId, createWorkoutDto),
      select: workoutSelect,
    });
  }

  async findAll(
    userId: UserId,
    includeExercises = false,
  ): Promise<WorkoutSummaryDto[] | WorkoutResponseDto[]> {
    const select = includeExercises ? workoutSelect : workoutSelectSummary;
    return await this.prisma.workout.findMany({
      where: { userId },
      select,
    });
  }

  async findOne(userId: UserId, id: string): Promise<WorkoutResponseDto | null> {
    return await this.prisma.workout.findFirst({
      where: { id, userId },
      select: workoutSelect,
    });
  }

  async findAllPublic(
    includeExercises = false,
  ): Promise<WorkoutSummaryDto[] | WorkoutResponseDto[]> {
    const select = includeExercises ? workoutSelect : workoutSelectSummary;
    return await this.prisma.workout.findMany({
      select,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublicForUser(
    userId: UserId,
    includeExercises = false,
  ): Promise<WorkoutSummaryDto[] | WorkoutResponseDto[]> {
    const select = includeExercises ? workoutSelect : workoutSelectSummary;
    return await this.prisma.workout.findMany({
      where: { userId },
      select,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnePublic(id: string): Promise<WorkoutResponseDto | null> {
    return await this.prisma.workout.findFirst({
      where: { id },
      select: workoutSelect,
    });
  }

  async update(
    userId: UserId,
    id: string,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<WorkoutResponseDto | null> {
    const exists = await this.prisma.workout.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!exists) {
      throw new NotFoundException();
    }

    const data = toWorkoutUpdateInput(updateWorkoutDto);
    if (Object.keys(data).length === 0) {
      return this.findOne(userId, id);
    }

    return await this.prisma.workout.update({
      where: { id },
      data,
      select: workoutSelect,
    });
  }

  async remove(userId: UserId, id: string): Promise<WorkoutResponseDto> {
    const exists = await this.prisma.workout.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!exists) {
      throw new NotFoundException();
    }

    return await this.prisma.workout.delete({
      where: { id },
      select: workoutSelect,
    });
  }

  async replaceWorkoutSteps(
    userId: UserId,
    id: string,
    stepsDto: CreateWorkoutStepDto[],
  ): Promise<WorkoutResponseDto> {
    const exists = await this.prisma.workout.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!exists) {
      throw new NotFoundException();
    }

    return await this.prisma.workout.update({
      where: { id },
      data: toWorkoutStepsReplaceUpdateInput(stepsDto),
      select: workoutSelect,
    });
  }
}
