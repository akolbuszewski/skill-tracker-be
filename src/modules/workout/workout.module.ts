import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
