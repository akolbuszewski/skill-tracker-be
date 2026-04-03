import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthLoginResponseDto, AuthRegisterResponseDto } from './dto/auth-response.dto';

export function OpenApiAuthRegister() {
  return applyDecorators(
    ApiOperation({ summary: 'Register' }),
    ApiCreatedResponse({ type: AuthRegisterResponseDto }),
  );
}

export function OpenApiAuthLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Login (JWT)' }),
    ApiCreatedResponse({ type: AuthLoginResponseDto }),
  );
}

export function OpenApiAuthProfile() {
  return applyDecorators(
    ApiOperation({ summary: 'Profile (placeholder)' }),
    ApiOkResponse({
      schema: { type: 'string', example: 'authenticated' },
      description: 'Temporary: returns a literal string.',
    }),
  );
}
