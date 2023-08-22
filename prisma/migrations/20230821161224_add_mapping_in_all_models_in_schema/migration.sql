/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BooksOnBookLists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Read` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookList" DROP CONSTRAINT "BookList_user_id_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnBookLists" DROP CONSTRAINT "BooksOnBookLists_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnBookLists" DROP CONSTRAINT "BooksOnBookLists_book_list_id_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteBook" DROP CONSTRAINT "FavoriteBook_book_id_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteBook" DROP CONSTRAINT "FavoriteBook_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_following_id_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_read_id_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Read" DROP CONSTRAINT "Read_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Read" DROP CONSTRAINT "Read_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_book_id_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_book_id_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "BookList";

-- DropTable
DROP TABLE "BooksOnBookLists";

-- DropTable
DROP TABLE "FavoriteBook";

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "Progress";

-- DropTable
DROP TABLE "Read";

-- DropTable
DROP TABLE "UserActivity";

-- CreateTable
CREATE TABLE "follows" (
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "authors" TEXT[],
    "publisher" TEXT,
    "publish_date" TIMESTAMP(3),
    "language" TEXT,
    "page_count" INTEGER,
    "description" TEXT,
    "image_key" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_books" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "book_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "favorite_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_activities" (
    "id" TEXT NOT NULL,
    "activity" TEXT,
    "activity_type" "ActivityType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "book_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_key" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "book_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_on_book_lists" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "book_list_id" TEXT NOT NULL,

    CONSTRAINT "books_on_book_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reads" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "status" "ReadStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "review_rating" DOUBLE PRECISION,
    "review_content" TEXT,
    "review_is_spoiler" BOOLEAN,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "is_spoiler" BOOLEAN NOT NULL,
    "page" INTEGER,
    "percentage" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_lists" ADD CONSTRAINT "book_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_on_book_lists" ADD CONSTRAINT "books_on_book_lists_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_on_book_lists" ADD CONSTRAINT "books_on_book_lists_book_list_id_fkey" FOREIGN KEY ("book_list_id") REFERENCES "book_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_read_id_fkey" FOREIGN KEY ("read_id") REFERENCES "reads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
