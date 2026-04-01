import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ExcercisesModule } from './modules/excercises/excercises.module';
import { WorkoutModule } from './modules/workout/workout.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ExcercisesModule, WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
