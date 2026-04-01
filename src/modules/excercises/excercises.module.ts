import { Module } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { ExcercisesController } from './excercises.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExcercisesController],
  providers: [ExcercisesService],
})
export class ExcercisesModule {}
