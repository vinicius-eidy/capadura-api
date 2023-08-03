import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { BooksOnBookListsRepository } from "../books-on-book-lists-repository";

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

        const bookOnBookListCamelCase = transformKeysToCamelCase(bookOnBookList);

        return bookOnBookListCamelCase;
    }
}
