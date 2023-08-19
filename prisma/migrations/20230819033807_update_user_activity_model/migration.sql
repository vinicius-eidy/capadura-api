/*
  Warnings:

  - You are about to drop the column `activityType` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserActivity` table. All the data in the column will be lost.
  - Added the required column `activity_type` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "activityType",
DROP COLUMN "createdAt",
ADD COLUMN     "activity_type" "ActivityType" NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
