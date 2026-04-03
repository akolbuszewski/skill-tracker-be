import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';
import type { UserId } from 'src/common/types/ids';
import { ParseUserIdPipe } from 'src/common/pipes/parseUserId.pipe';
import {
  OpenApiExerciseCreate,
  OpenApiExerciseGetMine,
  OpenApiExerciseListMine,
  OpenApiExercisePublicGetOne,
  OpenApiExercisePublicList,
  OpenApiExercisePublicListForUser,
  OpenApiExerciseRemove,
  OpenApiExerciseUpdate,
} from './exercises.openapi';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiExerciseCreate()
  @Post()
  create(@Req() req: AuthedRequest, @Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(req.user.sub, createExerciseDto);
  }

  // --------
  // "Me" (owner-scoped)
  // --------
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiExerciseListMine()
  @Get()
  findAllForUser(@Req() req: AuthedRequest) {
    return this.exercisesService.findAll(req.user.sub);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiExerciseGetMine()
  @Get('me/:id')
  findOneForUser(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.exercisesService.findOneForUser(req.user.sub, id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiExerciseUpdate()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiExerciseRemove()
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.exercisesService.remove(id, req.user.sub);
  }

  // --------
  // Public browse (read-only)
  // --------
  @OpenApiExercisePublicList()
  @Get('public')
  findAllPublic() {
    return this.exercisesService.findAllPublic();
  }

  @OpenApiExercisePublicListForUser()
  @Get('public/users/:userId')
  findAllPublicForUser(@Param('userId', ParseUserIdPipe) userId: UserId) {
    return this.exercisesService.findAllPublicForUser(userId);
  }

  @OpenApiExercisePublicGetOne()
  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.exercisesService.findOnePublic(id);
  }
}
