-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('INITIATED', 'IN_PROGRESS', 'DONE', 'USER_BREAK', 'CANCELLED');

-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'IN_PROGRESS';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "WorkoutStatus" NOT NULL DEFAULT 'INITIATED';
