import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ExercisesModule, WorkoutModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
