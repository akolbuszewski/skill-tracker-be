import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { WorkoutModule } from '../workout/workout.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [DatabaseModule, WorkoutModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
