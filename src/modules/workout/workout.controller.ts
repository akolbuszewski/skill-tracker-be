import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: AuthedRequest, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(req.user.sub, createWorkoutDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: AuthedRequest) {
    return this.workoutService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthedRequest) {
    return this.workoutService.findOne(req.user.sub, id);
  }

    @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Req() req: AuthedRequest, @Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(req.user.sub, id, updateWorkoutDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.workoutService.remove(req.user.sub, id);
  }
}
