import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { BookListsRepository, updateBookList } from "../booklist-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

export class PrismaBookListsRepository implements BookListsRepository {
    async findManyByUserId(userId: string, q: string) {
        const bookLists = await prisma.bookList.findMany({
            where: {
                user_id: userId,
                name: {
                    contains: q,
                    mode: "insensitive",
                },
            },
        });

        if (!bookLists) return [];

        const bookListsCamelCase = transformKeysToCamelCase(bookLists);

        return bookListsCamelCase;
    }

    async update({ bookListId, name, description, bookId }: updateBookList) {
        const bookList = await prisma.bookList.findUniqueOrThrow({
            where: {
                id: bookListId,
            },
            include: {
                books: true,
            },
        });

        const bookToRemove = bookList.books.find((book) => book.id === bookId);

        const dataToUpdate = {
            ...(name && { name }),
            ...(description && { description }),
            // Conditionally disconnect or connect the book based on whether bookToRemove exists
            books: bookToRemove ? { disconnect: { id: bookId } } : { connect: { id: bookId } },
        };

        const bookLists = await prisma.bookList.update({
            where: {
                id: bookListId,
            },
            data: dataToUpdate,
        });

        const bookListsCamelCase = transformKeysToCamelCase(bookLists);

        return bookListsCamelCase;
    }

    async delete(bookListId: string, userId: string) {
        const bookList = await prisma.bookList.findUnique({
            where: {
                id: bookListId,
            },
            include: {
                user: true,
            },
        });

        if (!bookList) {
            throw new ResourceNotFoundError();
        }

        // Check if the authenticated user is the owner of the BookList
        if (bookList.user.id !== userId) {
            throw new UnauthorizedError();
        }

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

        const bookListCamelCase = transformKeysToCamelCase(bookList);

        return bookListCamelCase;
    }
}
