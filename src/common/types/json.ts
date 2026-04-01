import type { Prisma } from '@prisma/client';

/**
 * Single place to bind "API JSON payload" type to Prisma.
 * If we ever change persistence/ORM, we swap this type here.
 */
export type JsonInput = Prisma.InputJsonValue;

