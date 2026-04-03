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
import {
  OpenApiWorkoutCreate,
  OpenApiWorkoutGetOne,
  OpenApiWorkoutListMine,
  OpenApiWorkoutPublicGetOne,
  OpenApiWorkoutPublicList,
  OpenApiWorkoutPublicListForUser,
  OpenApiWorkoutRemove,
  OpenApiWorkoutReplaceSteps,
  OpenApiWorkoutUpdate,
} from './workout.openapi';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiWorkoutCreate()
  @Post()
  create(@Req() req: AuthedRequest, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(req.user.sub, createWorkoutDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiWorkoutListMine()
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
  @OpenApiWorkoutPublicList()
  @Get('public')
  findAllPublic(
    @Query('includeExercises', new DefaultValuePipe(false), ParseBoolPipe) includeExercises: boolean,
  ) {
    return this.workoutService.findAllPublic(includeExercises);
  }

  @OpenApiWorkoutPublicListForUser()
  @Get('public/users/:userId')
  findAllPublicForUser(
    @Param('userId', ParseUserIdPipe) userId: UserId,
    @Query('includeExercises', new DefaultValuePipe(false), ParseBoolPipe) includeExercises: boolean,
  ) {
    return this.workoutService.findAllPublicForUser(userId, includeExercises);
  }

  @OpenApiWorkoutPublicGetOne()
  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.workoutService.findOnePublic(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiWorkoutGetOne()
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthedRequest) {
    return this.workoutService.findOne(req.user.sub, id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiWorkoutUpdate()
  @Patch(':id')
  update(@Req() req: AuthedRequest, @Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(req.user.sub, id, updateWorkoutDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiWorkoutRemove()
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.workoutService.remove(req.user.sub, id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiWorkoutReplaceSteps()
  @Put(':id/steps')
  addSteps(@Req() req: AuthedRequest, @Param('id') id, @Body() workoutStepDto: CreateWorkoutStepDto[]) {
    return this.workoutService.replaceWorkoutSteps(req.user.sub, id, workoutStepDto);
  }
}
