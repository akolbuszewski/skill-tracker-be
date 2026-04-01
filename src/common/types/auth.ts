import { Request } from 'express';
import type { UserId } from './ids';

export type JwtPayload = { sub: UserId; email: string };

export type AuthedRequest = Request & { user: JwtPayload };
