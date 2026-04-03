import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

export function OpenApiUsersMe() {
  return applyDecorators(
    ApiOperation({ summary: 'Current user profile' }),
    ApiOkResponse({ type: UserProfileResponseDto }),
  );
}
