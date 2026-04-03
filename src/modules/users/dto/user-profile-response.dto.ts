import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty()
  email!: string;

  @ApiProperty({ type: String, nullable: true })
  displayName!: string | null;
}
