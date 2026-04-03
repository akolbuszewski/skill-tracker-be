import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function OpenApiAppHello() {
  return applyDecorators(
    ApiOperation({ summary: 'Health / hello' }),
    ApiOkResponse({
      schema: { type: 'string', example: 'Hello World!' },
    }),
  );
}
