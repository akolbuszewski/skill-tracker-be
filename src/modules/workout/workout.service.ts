import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { workoutSelect } from './workout.select';
import type { UserId } from 'src/common/types/ids';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: UserId, createWorkoutDto: CreateWorkoutDto) {
    return await this.prisma.workout.create({
      data: {
        ...createWorkoutDto,
        userId: userId,
        steps: {
          create: createWorkoutDto.steps
          
        }
      }
    })
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

  async update(userId: UserId, id: string, createWorkoutDto: UpdateWorkoutDto) {
    return await this.prisma.workout.update({
      where: {
        userId,
        id
      },
      data: {
        ...createWorkoutDto,
        steps: {
          create: createWorkoutDto.steps
          
        }
      }
    })
  }

  async remove(userId: UserId, id: string) {
    return await this.prisma.workout.delete({
      where: {
        id,
        userId,
      },
      select: workoutSelect,
    });
  }
}
