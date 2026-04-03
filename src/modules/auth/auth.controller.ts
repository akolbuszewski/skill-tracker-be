import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../auth.guard';
import { OpenApiAuthLogin, OpenApiAuthProfile, OpenApiAuthRegister } from './auth.openapi';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @OpenApiAuthRegister()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @OpenApiAuthLogin()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @OpenApiAuthProfile()
  @Get('profile')
  getProfile() {
    return 'authenticated'
  }
}
