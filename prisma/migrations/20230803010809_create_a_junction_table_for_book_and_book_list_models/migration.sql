/*
  Warnings:

  - You are about to drop the column `book_list_id` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_list_id_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "book_list_id";

-- CreateTable
CREATE TABLE "BookOnBookList" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "book_list_id" TEXT NOT NULL,

    CONSTRAINT "BookOnBookList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookOnBookList" ADD CONSTRAINT "BookOnBookList_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnBookList" ADD CONSTRAINT "BookOnBookList_book_list_id_fkey" FOREIGN KEY ("book_list_id") REFERENCES "BookList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
