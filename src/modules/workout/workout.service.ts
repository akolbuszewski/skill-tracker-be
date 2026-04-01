import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { workoutSelect } from './workout.select';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createWorkoutDto: CreateWorkoutDto) {
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

  async findAll(userId: string) {
    return await this.prisma.workout.findMany({
      where: {
        userId,
      },
      select: workoutSelect,
    });
  }

  async findOne(id: string, userId: string) {
    return await this.prisma.workout.findFirst({
      where: {
        id,
        userId,
      },
      select: workoutSelect,
    });
  }

  async update(userId: string, id: string, createWorkoutDto: UpdateWorkoutDto) {
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

  async remove(userId: string, id: string) {
    return await this.prisma.workout.delete({
      where: {
        id,
        userId,
      },
      select: workoutSelect,
    });
  }
}
