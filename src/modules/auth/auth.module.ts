import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
const jwtSecret = process.env.JWT_ACCESS_SECRET;
if (!jwtSecret) throw new Error('Missing JWT_ACCESS_SECRET');

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '15m'}
    })
  ]
})
export class AuthModule {}
