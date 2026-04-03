import { IsUUID } from 'class-validator';

/** Session is created from a workout template; name/description are copied server-side from the workout. */
export class CreateSessionDto {
  @IsUUID()
  workoutId!: string;
}
