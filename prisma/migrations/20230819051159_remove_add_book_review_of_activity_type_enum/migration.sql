/*
  Warnings:

  - The values [ADD_BOOK_TO_BOOKLIST] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('LIKE_BOOK', 'START_READ', 'PAUSE_READ', 'RESUME_READ', 'ADD_BOOK_PROGRESS', 'ADD_BOOK_REVIEW');
ALTER TABLE "UserActivity" ALTER COLUMN "activity_type" TYPE "ActivityType_new" USING ("activity_type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
COMMIT;
