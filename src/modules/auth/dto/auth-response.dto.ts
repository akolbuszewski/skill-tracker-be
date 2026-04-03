import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;
}

export class AuthLoginResponseDto {
  @ApiProperty({ description: 'JWT bearer token' })
  token!: string;
}
