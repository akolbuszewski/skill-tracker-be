import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { workoutSelect } from './workout.select';
import type { UserId } from 'src/common/types/ids';
import { CreateWorkoutStepDto } from './dto/create-workout-step.dto';
import {
  toWorkoutStepsReplaceUpdateInput,
  toWorkoutUncheckedCreateInput,
  toWorkoutUpdateInput,
} from './workout.mapper';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: UserId, createWorkoutDto: CreateWorkoutDto) {
    return await this.prisma.workout.create({
      data: toWorkoutUncheckedCreateInput(userId, createWorkoutDto),
      select: workoutSelect,
    });
  }

  async findAll(userId: UserId) {
    return await this.prisma.workout.findMany({
      where: {
        userId,
      },
      select: workoutSelect,
    });
  }

  async findOne(userId: UserId, id: string) {
    return await this.prisma.workout.findFirst({
      where: {
        id,
        userId,
      },
      select: workoutSelect,
    });
  }

  async update(userId: UserId, id: string, updateWorkoutDto: UpdateWorkoutDto) {
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

  async remove(userId: UserId, id: string) {
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

  async replaceWorkoutSteps(userId: UserId, id: string, stepsDto: CreateWorkoutStepDto[]) {
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
