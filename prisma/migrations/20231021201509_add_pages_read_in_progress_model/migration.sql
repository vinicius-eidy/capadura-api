/*
  Warnings:

  - Added the required column `pages_read` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Made the column `page` on table `progress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentage` on table `progress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "progress" ADD COLUMN     "pages_read" INTEGER NOT NULL,
ALTER COLUMN "page" SET NOT NULL,
ALTER COLUMN "percentage" SET NOT NULL;
