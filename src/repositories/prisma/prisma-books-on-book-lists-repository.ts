import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
    BooksOnBookListsRepository,
    findManyByBookListData,
} from "../books-on-book-lists-repository";

export class PrismaBooksOnBookListsRepository implements BooksOnBookListsRepository {
    async findUnique(bookOnBookListId: string) {
        const bookOnBookList = await prisma.booksOnBookLists.findUnique({
            where: {
                id: bookOnBookListId,
            },
            include: {
                book_list: true,
            },
        });

        return bookOnBookList || null;
    }

    async findManyByBookList({ bookListId, page, perPage }: findManyByBookListData) {
        const bookOnBookList = await prisma.booksOnBookLists.findMany({
            where: {
                book_list_id: bookListId,
            },
            include: {
                book: true,
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });

        return bookOnBookList;
    }

    async getTotalListsWithSomeBookCount(bookId: string) {
        const uniqueBookLists = await prisma.booksOnBookLists.findMany({
            where: {
                book_id: bookId,
            },
            distinct: ["book_list_id"],
        });

        return uniqueBookLists.length;
    }

    async delete(bookOnBookListId: string) {
        await prisma.booksOnBookLists.delete({
            where: {
                id: bookOnBookListId,
            },
        });

        return;
    }

    async create(data: Prisma.BooksOnBookListsUncheckedCreateInput) {
        const bookOnBookList = await prisma.booksOnBookLists.create({
            data,
        });

        return bookOnBookList;
    }
}
