import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import type { UserId } from 'src/common/types/ids';
import type { CreateSessionDto } from './dto/create-session.dto';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateSessionDto } from './dto/update-session.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import { sessionSelect } from './session.select';
import { buildTasksFromWorkout } from './sessions.mapper';
import { WorkoutService } from '../workout/workout.service';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService, private readonly workoutService: WorkoutService) {}

  async findAll(userId: UserId) {
    return await this.prisma.session.findMany({
      where: { userId },
      select: sessionSelect,
    });
  }

  async findOne(userId: UserId, id: string) {
    return await this.prisma.session.findFirst({
      where: { id, userId },
      select: sessionSelect,
    });
  }

  async create(userId: UserId, dto: CreateSessionDto) {
    return this.createFromWorkout(userId, dto);
  }

  async createFromWorkout(userId: UserId, dto: CreateSessionDto) {
    const workout = await this.workoutService.findOne(userId, dto.workoutId);
    if (!workout) {
      throw new NotFoundException();
    }

    const tasks = buildTasksFromWorkout(workout.steps);

    return await this.prisma.session.create({
      data: {
        userId,
        workoutId: workout.id,
        name: workout.name,
        description: workout.description,
        tasks: { create: tasks },
      },
      select: sessionSelect,
    });
  }

  async update(userId: UserId, id: string, dto: UpdateSessionDto) {
    throw new NotImplementedException('SessionsService.update');
  }

  async remove(userId: UserId, id: string) {
    throw new NotImplementedException('SessionsService.remove');
  }

  async addTask(userId: UserId, sessionId: string, dto: CreateTaskDto) {
    throw new NotImplementedException('SessionsService.addTask');
  }

  async updateTask(userId: UserId, sessionId: string, taskId: string, dto: UpdateTaskDto) {
    throw new NotImplementedException('SessionsService.updateTask');
  }

  async startSession(userId: UserId, sessionId: string) {
    throw new NotImplementedException('SessionsService.startSession');
  }

  async completeSession(userId: UserId, sessionId: string) {
    throw new NotImplementedException('SessionsService.completeSession');
  }

  async startTask(userId: UserId, sessionId: string, taskId: string) {
    throw new NotImplementedException('SessionsService.startTask');
  }

  async stopTask(userId: UserId, sessionId: string, taskId: string) {
    throw new NotImplementedException('SessionsService.stopTask');
  }
}
