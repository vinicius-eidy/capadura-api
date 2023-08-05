import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BookListsRepository, updateBookList } from "../book-lists-repository";

export class PrismaBookListsRepository implements BookListsRepository {
    async findUniqueById(bookListId: string) {
        const bookList = await prisma.bookList.findUnique({
            where: {
                id: bookListId,
            },
            include: {
                user: true,
            },
        });

        return bookList;
    }

    async findManyByUserId(userId: string, q: string) {
        const bookLists = await prisma.bookList.findMany({
            where: {
                user_id: userId,
                name: {
                    contains: q,
                    mode: "insensitive",
                },
            },
            include: {
                books: true,
            },
        });

        return bookLists || [];
    }

    async update({ bookListId, name, description }: updateBookList) {
        const bookLists = await prisma.bookList.update({
            where: {
                id: bookListId,
            },
            data: {
                name,
                description,
            },
        });

        return bookLists;
    }

    async delete(bookListId: string) {
        await prisma.bookList.delete({
            where: {
                id: bookListId,
            },
        });

        return;
    }

    async create(data: Prisma.BookListUncheckedCreateInput) {
        const bookList = await prisma.bookList.create({
            data,
        });

        return bookList;
    }
}
