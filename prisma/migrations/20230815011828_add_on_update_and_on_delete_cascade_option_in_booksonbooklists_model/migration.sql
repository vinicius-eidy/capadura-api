-- DropForeignKey
ALTER TABLE "BooksOnBookLists" DROP CONSTRAINT "BooksOnBookLists_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnBookLists" DROP CONSTRAINT "BooksOnBookLists_book_list_id_fkey";

-- AddForeignKey
ALTER TABLE "BooksOnBookLists" ADD CONSTRAINT "BooksOnBookLists_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnBookLists" ADD CONSTRAINT "BooksOnBookLists_book_list_id_fkey" FOREIGN KEY ("book_list_id") REFERENCES "BookList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
