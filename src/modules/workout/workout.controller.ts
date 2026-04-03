import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';
import type { UserId } from 'src/common/types/ids';
import { ParseUserIdPipe } from 'src/common/pipes/parseUserId.pipe';
import { CreateWorkoutStepDto } from './dto/create-workout-step.dto';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: AuthedRequest, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(req.user.sub, createWorkoutDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Req() req: AuthedRequest,
    @Query('includeExercises', new DefaultValuePipe(false), ParseBoolPipe) includeExercises: boolean,
  ) {
    return this.workoutService.findAll(req.user.sub, includeExercises);
  }

  // --------
  // Public browse (read-only)
  // --------
  @Get('public')
  findAllPublic(
    @Query('includeExercises', new DefaultValuePipe(false), ParseBoolPipe) includeExercises: boolean,
  ) {
    return this.workoutService.findAllPublic(includeExercises);
  }

  @Get('public/users/:userId')
  findAllPublicForUser(
    @Param('userId', ParseUserIdPipe) userId: UserId,
    @Query('includeExercises', new DefaultValuePipe(false), ParseBoolPipe) includeExercises: boolean,
  ) {
    return this.workoutService.findAllPublicForUser(userId, includeExercises);
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.workoutService.findOnePublic(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthedRequest) {
    return this.workoutService.findOne(req.user.sub, id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Req() req: AuthedRequest, @Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(req.user.sub, id, updateWorkoutDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.workoutService.remove(req.user.sub, id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Put(':id/steps')
  addSteps(@Req() req: AuthedRequest, @Param('id') id, @Body() workoutStepDto: CreateWorkoutStepDto[]) {
    return this.workoutService.replaceWorkoutSteps(req.user.sub, id, workoutStepDto);
  }

}
