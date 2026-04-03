import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';
import { OpenApiUsersMe } from './users.openapi';

@ApiTags('users')
@ApiBearerAuth('JWT')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @OpenApiUsersMe()
  @Get('me')
  getProfile(@Req() req: AuthedRequest) {
    return this.usersService.getUser(req.user.sub)
  }
}
