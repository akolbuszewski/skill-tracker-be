import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';

@Controller('excercises')
export class ExcercisesController {
  constructor(private readonly excercisesService: ExcercisesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: AuthedRequest, @Body() createExcerciseDto: CreateExcerciseDto) {
    return this.excercisesService.create(req.user.sub, createExcerciseDto);
  }

  // --------
  // "Me" (owner-scoped)
  // --------
  @UseGuards(AuthGuard)
  @Get()
  findAllForUser(@Req() req: AuthedRequest) {
    return this.excercisesService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('me/:id')
  findOneForUser(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.excercisesService.findOneForUser(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExcerciseDto: UpdateExcerciseDto) {
    return this.excercisesService.update(id, updateExcerciseDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.excercisesService.remove(id, req.user.sub);
  }

  // --------
  // Public browse (read-only)
  // --------
  @Get('public')
  findAllPublic() {
    return this.excercisesService.findAllPublic();
  }

  @Get('public/users/:userId')
  findAllPublicForUser(@Param('userId') userId: string) {
    return this.excercisesService.findAllPublicForUser(userId);
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.excercisesService.findOnePublic(id);
  }
}
