import { CreateSessionDto } from './create-session.dto';

/** Same body as {@link CreateSessionDto}; dedicated route for clients that always start from a workout. */
export class CreateSessionFromWorkoutDto extends CreateSessionDto {}
