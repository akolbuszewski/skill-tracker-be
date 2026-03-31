import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth.guard';
import type { AuthedRequest } from 'src/common/types/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req: AuthedRequest) {
    return this.usersService.getUser(req.user.sub)
  }
}
