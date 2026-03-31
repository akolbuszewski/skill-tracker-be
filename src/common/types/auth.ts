import { Request } from "express";
export type JwtPayload = { sub: string; email: string }

export type AuthedRequest = Request & { user: JwtPayload }
