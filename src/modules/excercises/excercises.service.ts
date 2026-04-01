import { Injectable } from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { excerciseSelect } from './excercise.select';
import type { UserId } from 'src/common/types/ids';

@Injectable()
export class ExcercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: UserId, dto: CreateExcerciseDto) {
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
      select: excerciseSelect,
    });
  }

  async findAll(userId: UserId) {
    return await this.prisma.exercise.findMany({
      where: {
        userId,
      },
      select: excerciseSelect,
    });
  }

  async findOneForUser(userId: UserId, id: string) {
    return await this.prisma.exercise.findFirst({
      where: {
        id,
        userId,
      },
      select: excerciseSelect,
    });
  }

  async findAllPublic() {
    return await this.prisma.exercise.findMany({
      select: excerciseSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublicForUser(userId: UserId) {
    return await this.prisma.exercise.findMany({
      where: { userId },
      select: excerciseSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnePublic(id: string) {
    return await this.prisma.exercise.findFirst({
      where: { id },
      select: excerciseSelect,
    });
  }

  async update(id: string, updateExcerciseDto: UpdateExcerciseDto) {
    return await this.prisma.exercise.update({
      where: {
        id,
      },
      data: {
        name: updateExcerciseDto.name,
        description: updateExcerciseDto.description,
        timeboxSeconds: updateExcerciseDto.timeboxSeconds,
        descriptionRichText: updateExcerciseDto.descriptionRichText,
        resources: updateExcerciseDto.resources?.length
          ? {
              deleteMany: {},
              create: updateExcerciseDto.resources.map((r) => ({
                type: r.type,
                title: r.title,
                url: r.url,
              })),
            }
          : undefined,
      },
      select: excerciseSelect,
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
