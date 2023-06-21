/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_reviewId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "reviewId",
ADD COLUMN     "bookId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Read" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "isSpoiler" BOOLEAN NOT NULL,
    "page" INTEGER,
    "percentage" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readId" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_readId_fkey" FOREIGN KEY ("readId") REFERENCES "Read"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
