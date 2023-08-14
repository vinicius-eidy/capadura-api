import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BookListsRepository } from "../book-lists-repository";

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

    async findManyByUserId(userId: string, q: string, bookId?: string) {
        const bookLists = await prisma.bookList.findMany({
            where: {
                user_id: userId,
                name: {
                    contains: q,
                    mode: "insensitive",
                },
            },
            include: {
                // just include book if bookId is provided
                books: bookId
                    ? {
                          where: {
                              book_id: bookId,
                          },
                          take: 1,
                      }
                    : false,
            },
        });

        return bookLists || [];
    }

    async update(data: Prisma.BookListUpdateInput) {
        const bookLists = await prisma.bookList.update({
            where: {
                id: data.id as string,
            },
            data: {
                name: data.name,
                description: data.description,
                image_key: data.image_key,
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
