/*
  Warnings:

  - You are about to drop the column `timebox` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `durationSeconds` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `timeboxSeconds` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedDurationSeconds` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'DONE', 'SKIPPED');

-- AlterEnum
ALTER TYPE "ResourceType" ADD VALUE 'IMAGE';

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "timebox",
ADD COLUMN     "descriptionRichText" JSONB,
ADD COLUMN     "timeboxSeconds" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "durationSeconds",
ADD COLUMN     "actualDurationSeconds" INTEGER,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "plannedDurationSeconds" INTEGER NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "_ExerciseToWorkout";

-- CreateTable
CREATE TABLE "WorkoutStep" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "plannedDurationSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutStep_workoutId_order_key" ON "WorkoutStep"("workoutId", "order");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
