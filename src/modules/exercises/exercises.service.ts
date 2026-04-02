import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { exerciseSelect } from './exercise.select';
import type { UserId } from 'src/common/types/ids';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: UserId, dto: CreateExerciseDto) {
    return await this.prisma.exercise.create({
      data: {
        userId,
        name: dto.name,
        description: dto.description,
        descriptionRichText: dto.descriptionRichText,
        timeboxSeconds: dto.timeboxSeconds,
        resources: dto.resources?.length
          ? {
              create: dto.resources.map((r) => ({
                type: r.type,
                title: r.title,
                url: r.url,
              })),
            }
          : undefined,
      },
      select: exerciseSelect,
    });
  }

  async findAll(userId: UserId) {
    return await this.prisma.exercise.findMany({
      where: {
        userId,
      },
      select: exerciseSelect,
    });
  }

  async findOneForUser(userId: UserId, id: string) {
    return await this.prisma.exercise.findFirst({
      where: {
        id,
        userId,
      },
      select: exerciseSelect,
    });
  }

  async findAllPublic() {
    return await this.prisma.exercise.findMany({
      select: exerciseSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublicForUser(userId: UserId) {
    return await this.prisma.exercise.findMany({
      where: { userId },
      select: exerciseSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnePublic(id: string) {
    return await this.prisma.exercise.findFirst({
      where: { id },
      select: exerciseSelect,
    });
  }

  async update(id: string, dto: UpdateExerciseDto) {
    return await this.prisma.exercise.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        description: dto.description,
        timeboxSeconds: dto.timeboxSeconds,
        descriptionRichText: dto.descriptionRichText,
        resources: dto.resources?.length
          ? {
              deleteMany: {},
              create: dto.resources.map((r) => ({
                type: r.type,
                title: r.title,
                url: r.url,
              })),
            }
          : undefined,
      },
      select: exerciseSelect,
    });
  }

  async remove(id: string, userID: UserId) {
    return await this.prisma.exercise.delete({
      where: {
        id,
        userId: userID,
      },
    });
  }
}
