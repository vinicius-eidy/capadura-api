/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_user_id_fkey";

-- AlterTable
ALTER TABLE "Read" ADD COLUMN     "review_content" TEXT,
ADD COLUMN     "review_rating" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Review";
