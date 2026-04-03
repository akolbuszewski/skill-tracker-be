-- Rename enum used only by Session.status (was misleadingly named WorkoutStatus).
ALTER TYPE "WorkoutStatus" RENAME TO "SessionStatus";
