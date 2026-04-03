import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';
import { CreateSessionDto } from './dto/create-session.dto';
import { CreateSessionFromWorkoutDto } from './dto/create-session-from-workout.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SessionsService } from './sessions.service';
import {
  OpenApiSessionAddTask,
  OpenApiSessionComplete,
  OpenApiSessionCreate,
  OpenApiSessionCreateFromWorkoutRoute,
  OpenApiSessionGetOne,
  OpenApiSessionList,
  OpenApiSessionRemove,
  OpenApiSessionStart,
  OpenApiSessionStartTask,
  OpenApiSessionStopTask,
  OpenApiSessionUpdate,
  OpenApiSessionUpdateTask,
} from './sessions.openapi';

@ApiTags('sessions')
@ApiBearerAuth('JWT')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @UseGuards(AuthGuard)
  @OpenApiSessionCreate()
  @Post()
  create(@Req() req: AuthedRequest, @Body() dto: CreateSessionDto) {
    return this.sessionsService.create(req.user.sub, dto);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionCreateFromWorkoutRoute()
  @Post('from-workout')
  createFromWorkout(@Req() req: AuthedRequest, @Body() dto: CreateSessionFromWorkoutDto) {
    return this.sessionsService.createFromWorkout(req.user.sub, dto);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionList()
  @Get()
  findAll(@Req() req: AuthedRequest) {
    return this.sessionsService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionGetOne()
  @Get(':id')
  async findOne(@Req() req: AuthedRequest, @Param('id') id: string) {
    const session = await this.sessionsService.findOne(req.user.sub, id);
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionUpdate()
  @Patch(':id')
  update(@Req() req: AuthedRequest, @Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.sessionsService.update(req.user.sub, id, dto);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionRemove()
  @Delete(':id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.sessionsService.remove(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionStart()
  @Post(':id/start')
  startSession(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.sessionsService.startSession(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionComplete()
  @Post(':id/complete')
  completeSession(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.sessionsService.completeSession(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionAddTask()
  @Post(':id/tasks')
  addTask(@Req() req: AuthedRequest, @Param('id') id: string, @Body() dto: CreateTaskDto) {
    return this.sessionsService.addTask(req.user.sub, id, dto);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionUpdateTask()
  @Patch(':id/tasks/:taskId')
  updateTask(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.sessionsService.updateTask(req.user.sub, id, taskId, dto);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionStartTask()
  @Post(':id/tasks/:taskId/start')
  startTask(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ) {
    return this.sessionsService.startTask(req.user.sub, id, taskId);
  }

  @UseGuards(AuthGuard)
  @OpenApiSessionStopTask()
  @Post(':id/tasks/:taskId/stop')
  stopTask(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ) {
    return this.sessionsService.stopTask(req.user.sub, id, taskId);
  }
}
