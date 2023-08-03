/*
  Warnings:

  - You are about to drop the `BookOnBookList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookOnBookList" DROP CONSTRAINT "BookOnBookList_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BookOnBookList" DROP CONSTRAINT "BookOnBookList_book_list_id_fkey";

-- DropTable
DROP TABLE "BookOnBookList";

-- CreateTable
CREATE TABLE "BooksOnBookLists" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "book_list_id" TEXT NOT NULL,

    CONSTRAINT "BooksOnBookLists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BooksOnBookLists" ADD CONSTRAINT "BooksOnBookLists_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnBookLists" ADD CONSTRAINT "BooksOnBookLists_book_list_id_fkey" FOREIGN KEY ("book_list_id") REFERENCES "BookList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
