import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ProgressModule } from './modules/progress/progress.module';

@Module({
  imports: [AuthModule, UserModule, WorkoutsModule, SessionsModule, ProgressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
