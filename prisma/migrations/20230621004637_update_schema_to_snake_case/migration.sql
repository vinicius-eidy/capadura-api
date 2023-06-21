/*
  Warnings:

  - You are about to drop the column `bookListId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `pageCount` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `BookList` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `isSpoiler` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `readId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Read` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Read` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Read` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Read` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `BookList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_spoiler` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read_id` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_id` to the `Read` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Read` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_bookListId_fkey";

-- DropForeignKey
ALTER TABLE "BookList" DROP CONSTRAINT "BookList_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_readId_fkey";

-- DropForeignKey
ALTER TABLE "Read" DROP CONSTRAINT "Read_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Read" DROP CONSTRAINT "Read_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookListId",
DROP COLUMN "pageCount",
DROP COLUMN "publishDate",
ADD COLUMN     "book_list_id" TEXT,
ADD COLUMN     "page_count" INTEGER,
ADD COLUMN     "publish_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "BookList" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "book_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "createdAt",
DROP COLUMN "isSpoiler",
DROP COLUMN "readId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_spoiler" BOOLEAN NOT NULL,
ADD COLUMN     "read_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Read" DROP COLUMN "bookId",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "userId",
ADD COLUMN     "book_id" TEXT NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "book_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_list_id_fkey" FOREIGN KEY ("book_list_id") REFERENCES "BookList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_read_id_fkey" FOREIGN KEY ("read_id") REFERENCES "Read"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookList" ADD CONSTRAINT "BookList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
