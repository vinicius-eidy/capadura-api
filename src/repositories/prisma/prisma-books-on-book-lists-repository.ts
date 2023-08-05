import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
    BooksOnBookListsRepository,
    fetchManyByBookListData,
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

    async fetchManyByBookList({ bookListId, page, perPage }: fetchManyByBookListData) {
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
