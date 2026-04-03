import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SessionResponseDto } from './dto/session-response.dto';

export function OpenApiSessionCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create session from workout' }),
    ApiCreatedResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionCreateFromWorkoutRoute() {
  return applyDecorators(
    ApiOperation({ summary: 'Create session from workout (dedicated route)' }),
    ApiCreatedResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionList() {
  return applyDecorators(
    ApiOperation({ summary: 'List my sessions' }),
    ApiOkResponse({ type: SessionResponseDto, isArray: true }),
  );
}

export function OpenApiSessionGetOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get session details' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Update session' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionRemove() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete session' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionStart() {
  return applyDecorators(
    ApiOperation({ summary: 'Start session' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionComplete() {
  return applyDecorators(
    ApiOperation({ summary: 'Complete session' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionAddTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Add task to session' }),
    ApiCreatedResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionUpdateTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Update task' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionStartTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Start task' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}

export function OpenApiSessionStopTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Stop task' }),
    ApiOkResponse({ type: SessionResponseDto }),
  );
}
