/*
  Warnings:

  - A unique constraint covering the columns `[user_id,book_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BookList" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_book_id_key" ON "likes"("user_id", "book_id");
