import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';
import type { UserId } from 'src/common/types/ids';
import { ParseUserIdPipe } from 'src/common/pipes/parseUserId.pipe';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: AuthedRequest, @Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(req.user.sub, createExerciseDto);
  }

  // --------
  // "Me" (owner-scoped)
  // --------
  @UseGuards(AuthGuard)
  @Get()
  findAllForUser(@Req() req: AuthedRequest) {
    return this.exercisesService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('me/:id')
  findOneForUser(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.exercisesService.findOneForUser(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.exercisesService.remove(id, req.user.sub);
  }

  // --------
  // Public browse (read-only)
  // --------
  @Get('public')
  findAllPublic() {
    return this.exercisesService.findAllPublic();
  }

  @Get('public/users/:userId')
  findAllPublicForUser(@Param('userId', ParseUserIdPipe) userId: UserId) {
    return this.exercisesService.findAllPublicForUser(userId);
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.exercisesService.findOnePublic(id);
  }
}
