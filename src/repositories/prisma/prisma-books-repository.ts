import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BooksRepository } from "../books-repository";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export class PrismaBooksRepository implements BooksRepository {
    async findById(bookId: string) {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });

        const bookCamelCase = transformKeysToCamelCase(book);

        return bookCamelCase ?? null;
    }

    async create(data: Prisma.BookCreateInput) {
        const book = await prisma.book.create({
            data,
        });

        const bookCamelCase = transformKeysToCamelCase(book);

        return bookCamelCase;
    }
}
